import { FC, ReactNode } from "react";
import { Form, Formik, FormikProps } from "formik";
import { isFunction } from "lodash";
import { formHelpers } from "../formHelpers.ts";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { AddData, UpdateData, UpdateDataOne } from "../../service/global.ts";

// type TFIELDS = {
//   name: string;
//   value: any;
//   validationType: string;
//   validations: any;
//   lazy: () => void;
//   submitKey: string;
//   onSubmitValue: () => void;
//   isLanguageSchema: boolean;
// };
// interface propTypes  {
//     url: string,
//     method: string,
//     children: ReactNode,
//     isFormData: boolean,
//     fields: TFIELDS[]
//     axiosConfig: any,
//     normalizeData: () => never,
//     onSuccess: () => never,
//     onError: () => never,
//     onFinal: () => never,
// }
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

  const handleSubmit = async (values: any) => {
    const formValues = formHelpers.getFormValues(values, fields, isFormData);
    console.log(formValues);
    return;
    setLoader(true);
    if (id == "new" || !id) {
      await AddData(url, formValues)
        .then((res: any) => {
          if (res?.status == "200" || res?.status == "201") {
            // formHelpers.resetForm();
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
      onSubmit={(value: any) => {
        isFunction(onSubmit) ? onSubmit(value) : handleSubmit(value);
      }}
      enableReinitialize={true}
    >
      {(formik) => {
        return <Form {...formProps}>{children(formik)}</Form>;
      }}
    </Formik>
  );
};
