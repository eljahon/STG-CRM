import React, {FC, ReactNode} from "react";
import { Form, Formik,FormikProps } from "formik";
import { isFunction, get} from "lodash";
import {formHelpers} from "../formHelpers.ts";

type TFIELDS ={
    name: string,
    value: any,
    validationType: string,
    validations: any,
    lazy: () => void,
    submitKey: string,
    onSubmitValue: () => void,
    isLanguageSchema: boolean,
}
interface propTypes  {
    url: string,
    method: string,
    children: ReactNode,
    isFormData: boolean,
    fields: TFIELDS[]
    axiosConfig: any,
    normalizeData: () => never,
    onSuccess: () => never,
    onError: () => never,
    onFinal: () => never,
}
interface  IFORMCONTAINER {
    url:string,
    formik: FormikProps<any>,
    formProps: FormikProps,
    children: (formik: FormikProps<any>) => ReactNode
    params?:any,
    method?: string,
    isFormData?: boolean,
    fields:TFIELDS[],
    normalizeData?: any,
    axiosConfig?: any,
    onSuccess : () => void,
    onError: () => void,
    onFinal: () => void,
    customData: any,
    onSubmit: () => void ,
    validateOnMount?:boolean,
    validate?:any,
}
export const FormContainer:FC<IFORMCONTAINER> = ({
                                  url,
                                  params,
                                  method,
                                  children,
                                  isFormData,
                                  fields,
                                  onSuccess,
                                  onError,
                                  onFinal,
                                  customData,
                                  onSubmit,
                                  validateOnMount=false,
                                  ...formProps
                              }) => {
    const { initialValues, validationSchema } = formHelpers.createFormSchema(fields);
    // formHelpers
    console.log(fields,validationSchema)

    // console.log("initialValues", initialValues)
    const handleSubmit = (values, formHelpers) => {
        // const formValues = utils.formHelpers.getFormValues(
        //     values,
        //     fields,
        //     isFormData,
        //     normalizeData,
        //     languages
        // );
        // const requestUrl = params ? queryBuilder(url, params) : url;
        // console.log(formValues)
        // httpClient[method](requestUrl, {data: {...formValues,...customData}}, axiosConfig)
        //     .then(({ data }) => {
        //         formHelpers.resetForm();
        //         onSuccess(data);
        //         notifier.success("Действие успешно завершено");
        //     })
        //
        //     .catch((error) =>{
        //         // console.log(error)
        //         onError(error);
        //         formHelpers.setErrors(get(error, "response.data.errors"));
        //
        //         notifier.error(utils.formHelpers.gerErrorMessage(error));
        //     })
        //
        //     .finally(() => {
        //         formHelpers.setSubmitting(false);
        //         onFinal();
        //     });
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            validateOnMount={validateOnMount}
            onSubmit={
                (value,formHelpers) => {
                    // console.log(value)
                    isFunction(onSubmit) ? onSubmit(value, formHelpers) : handleSubmit(value, formHelpers)
                }
            }
            enableReinitialize={true}
        >
            {(formik) => {
                return <Form {...formProps}>{children(formik)}</Form>
            }}
        </Formik>
    );
};


/*

    yupValidation = string | number | boolean | date | object | array

    Field Object Structure
        name: String,
        value: Any,
        validationType: yupValidation,
        validations: [{type: yupValidation, params: Any}]
        onSubmitKey: String
        onSubmitValue: Function

*/