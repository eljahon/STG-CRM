import { FC, ReactNode } from "react";
import { Form, Formik, FormikProps } from "formik";
import { isFunction } from "lodash";
import { formHelpers } from "../formHelpers.ts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData, UpdateDataOne } from "../../service/global.ts";
interface IFORMCONTAINER {
  url: string;
  formik?: FormikProps<any>;
  formProps?: any;
  children: (formik: FormikProps<any>) => ReactNode;
  params?: any;
  isFormData?: boolean;
  fields?: any;
  normalizeData?: any;
  axiosConfig?: any;
  onSuccess?: any;
  onError?: any;
  onFinal?: any;
  customData?: any;
  onSubmit?: any;
  validateOnMount?: boolean;
  validate?: any;
  loaderGlob?: any;
  setLoader?: any;
}
export const FormContainer: FC<IFORMCONTAINER> = ({
  url,
  params,
  children,
  isFormData,
  fields,
  onSuccess,
  onError,
  onFinal,
  customData,
  onSubmit,
  loaderGlob,
  setLoader,
  validateOnMount = false,
  ...formProps
}) => {
  const { id } = useParams();
  const { initialValues, validationSchema } =
    formHelpers.createFormSchema(fields);
  const handleSubmit = async (values: any, formikHelper: any) => {
    const formValues = formHelpers.getFormValues(values, fields, isFormData);

    setLoader(true);
    if (id == "new") {
      console.log(formValues, '==>>>', id)
      await AddData(url, formValues)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            formikHelper.resetForm();
            onSuccess(res);
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => {
          onFinal();
          setLoader();
        });
    } else if (id == "old") {
      await UpdateDataOne(url, formValues)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            toast.success("seccessfully update");
            onSuccess(res);
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => onFinal());
    } else {
      await UpdateData(url, formValues, id)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            onSuccess(res);
            toast.success("seccessfully update");
          }
        })
        .catch((errors) => {
          onError(errors);
        })
        .finally(() => onFinal());
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={validateOnMount}
      onSubmit={async (value: any, formikHelper: any) => {
        console.log(value)
        if (customData) {
          isFunction(onSubmit)
            ? onSubmit(customData(value))
            : await handleSubmit(customData(value), formikHelper);
        } else {
          isFunction(onSubmit)
            ? onSubmit(value)
            : await handleSubmit(value, formikHelper);
        }
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        return <Form {...formProps}>{children(formik)}</Form>;
      }}
    </Formik>
  );
};
