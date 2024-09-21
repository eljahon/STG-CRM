import { FC, ReactNode } from "react";
import { Form, Formik, FormikProps } from "formik";
import { isFunction } from "lodash";
import { formHelpers } from "../formHelpers.ts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData } from "../../service/global.ts";
import { useTranslation } from "react-i18next";
interface IFORMCONTAINER {
  url: string;
  formik?: FormikProps<any>;
  formProps?: any;
  subUrl?: string;
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
  subUrl,
  validateOnMount = false,
  ...formProps
}) => {
  const { id } = useParams();
  const {t} = useTranslation();
  const { initialValues, validationSchema } =
    formHelpers.createFormSchema(fields);
  const handleSubmit = async (values: any, formikHelper: any) => {
    const formValues = formHelpers.getFormValues(values, fields, isFormData);
    if (id == "new") {
      await AddData(subUrl ? `${url}/${subUrl}` : url, isFunction(customData) ? customData(formValues) : formValues)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            formikHelper.resetForm();
            onSuccess(res);
          }
        })
        .catch((errors) => {
         isFunction(onError)&&onError(errors);
          toast.error(errors.message);
          // (errors.message, 'error =====>')
        })
        .finally(() => {
          onFinal();
          setLoader();
        });
    }  else {
      await UpdateData(url,isFunction(customData) ? customData(formValues) : formValues, id, subUrl)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            onSuccess(res);
            toast.success(t(`${url}`)+  " " + t('successfully') + " " + t('update'));
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
          isFunction(onSubmit)
          ? onSubmit( isFunction(customData) ? customData(value) : value)
            : await handleSubmit(value, formikHelper);
       
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        return <Form {...formProps}>{children(formik)}</Form>;
      }}
    </Formik>
  );
};
