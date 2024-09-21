import {get} from "lodash";
import React from "react";
import {FieldInputProps, FormikProps} from "formik";
interface ControlErro{
    form: FormikProps<any>,
    field: FieldInputProps<any>
}
export const ControlError:React.FC<ControlErro> = ({ form, field }) => {
    return (
        <>
            {get(form.touched, field.name) && get(form.errors, field.name) && (
                <div className='text-red-500'>
                    {form.errors[field.name] && field.name && "Bu maydonni to'ldirish majburiy"}
                </div>
            )}
        </>
    );
};