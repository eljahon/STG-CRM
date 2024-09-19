import { get, isArray, isFunction, isString } from "lodash";
import { serialize } from "object-to-formdata";
import * as yup from "yup";
const createYupSchema = (field: any) => {
  const { validationType = "string", validations = [], fields = [] } = field;
  let validator = (yup as any)[validationType]();
  validations.forEach(({ type, params }: any) => {
    console.log(type, params, 'type or params')
    switch (type) {
      case "typeError":
        validator = validator.typeError(params || `Invalid ${validationType}`);
        break;
      case "required":
        validator = validator.required(params || "Required");
        break;
      case "email":
        validator = validator.email(params || "Invalid email");
        break;
      case "phone":
        validator = validator.matches(
          /^\+998\d{9}$/,
          "Phone number is not valid"
        );
        break;
      case "min":
        validator = validator.min(...params);
        break;
      default:
        if (isArray(params)) {
          validator = validator[type](...params);
        } else {
          validator = validator[type](params);
        }
        break;
    }
  });

  if (validationType === "object" && fields.length > 0) {
    const nestedSchema: any = {};
    fields.forEach((nestedField: any) => {
      nestedSchema[nestedField.name] = createYupSchema(nestedField);
    });
    validator = validator.shape(nestedSchema);
  }

  return validator;
};

const createFormSchema = (fields: any) => {
  const initialValues: any = {};
  const validationSchema: any = {};
  fields.forEach((item: any) => {
    if ("value" in item && item.value !== undefined) {
      initialValues[item.name] = item.value;
    } else initialValues[item.name] = "";

    validationSchema[item.name] = createYupSchema(item);
  });

  return {
    initialValues,
    validationSchema: yup.object().shape(validationSchema)
  };
};

const mapFormValues = (values: any, fields: any) => {
  const formValues: any = {};

  fields.forEach((field: any) => {
    if (isFunction(field.onSubmitValue)) {
      if (isString(field.onSubmitKey))
        formValues[field.onSubmitKey] = field.onSubmitValue(
          values[field.name],
          values
        );
      else
        formValues[field.name] = field.onSubmitValue(
          values[field.name],
          values
        );
    } else formValues[field.name] = values[field.name];

    if (field.disabled) delete formValues[field.name];

    if (field.fields && field.fields.length > 0) {
      formValues[field.name] = mapFormValues(values[field.name], field.fields);
    }
  });

  return formValues;
};

const getFormValues = (
  values: any,
  fields: any,
  isFormData?: any,
  normalizeData?: any
) => {
  const createdValues: any = mapFormValues(values, fields);

  let formValues = isFormData ? serialize(createdValues) : createdValues;
  if (isFunction(normalizeData)) formValues = normalizeData(createdValues);

  return formValues;
};

const gerErrorMessage = (error: any) => {
  const defaultMessage = get(error, "response.data.error.message");
  const customMessage = get(
    Object.values(get(error, "response.data.message", {})),
    "0"
  );

  return customMessage || defaultMessage;
};

export const formHelpers = {
  createFormSchema,
  getFormValues,
  gerErrorMessage
};
