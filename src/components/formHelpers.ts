import { get, isArray, isFunction, isString } from "lodash";
// import { serialize } from "object-to-formdata";
import * as yup from "yup";

const createFormSchema = (fields, languages) => {
    const initialValues = {};
    const validationSchema = {};
    fields.forEach((item, index) => {
        if ("value" in item && item.value !== undefined) {
            if (item.isLanguageSchema) {
                initialValues[item.name] = initialValues[item.name] = languages.reduce(
                    (prev, lng) => ({
                        ...prev,
                        [lng.code]: get(item, `value.${lng.code}`, ""),
                    }),
                    {}
                );
            } else initialValues[item.name] = item.value;
        } else if (item.isLanguageSchema)
            initialValues[item.name] = languages.reduce(
                (prev, item) => ({ ...prev, [item.code]: "" }),
                {}
            );
        else initialValues[item.name] = "";

        validationSchema[item.name] = createYupSchema(item, languages, item.name);
    });
    // console.log( initialValues, yup.object().shape(validationSchema), validationSchema)
    return { initialValues, validationSchema: yup.object().shape(validationSchema) };
};

const createYupSchema = (field:any) => {
    const { validationType = "string", validations = [], lazy } = field;

    let validator = yup[validationType]();
    validations.forEach(({ type, params }, index) => {
        switch (type) {
            case "typeError":
                validator = validator.typeError(params ? params : `Invalid ${validationType}`);
                break;
            case "required":
                validator = validator.required(params ? params : "Required");
                break;
            // case "isRequired": validator = validator.when(name, (name, schema)=> {
            // 	console.log(name)
            // 	if(name)  return schema.required(`${name} is required`);
            // })
            // break;
            case "email":
                validator = validator.email(params ? params : "Invalid email");
                break;

            case "phone":
                validator = validator.matches(
                    /(\+9{2}8 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2})/g,
                    "Phone number is not valid"
                );
                break;

            default:
                if (isArray(params)) validator = validator[type](...params);
                else validator = validator[type](params);
                break;
        }
    });

    // if (isFunction(lazy)) {
    //     validator = lazy(validator, yup);
    // }

    // if (isBoolean(isLanguageSchema)) {
    //     validator = validator.shape(
    //         languages.reduce(
    //             (prev, item) => ({
    //                 ...prev,
    //                 [item.code]: yup.string().typeError("Invalid"),
    //             }),
    //             {}
    //         )
    //     );
    // }

    return validator;
};

const mapFormValues = (values, fields) => {
    const formValues = {};

    fields.forEach((field, index) => {
        if (isFunction(field.onSubmitValue)) {
            if (isString(field.onSubmitKey))
                formValues[field.onSubmitKey] = field.onSubmitValue(values[field.name], values);
            else formValues[field.name] = field.onSubmitValue(values[field.name], values);
        } else formValues[field.name] = values[field.name];

        if (field.disabled) delete formValues[field.name];
    });

    return formValues;
};

const getFormValues = (values, fields, isFormData, normalizeData) => {
    const createdValues = mapFormValues(values, fields);

    let formValues = isFormData ? serialize(createdValues) : createdValues;
    if (isFunction(normalizeData)) formValues = normalizeData(createdValues);

    return formValues;
};

const gerErrorMessage = (error) => {
    const defaultMessage = get(error, "response.data.error.message");
    const customMessage = get(Object.values(get(error, "response.data.message", {})), "0");

    return customMessage || defaultMessage;
};

export const formHelpers = {
    createFormSchema,
    getFormValues,
    gerErrorMessage,
};