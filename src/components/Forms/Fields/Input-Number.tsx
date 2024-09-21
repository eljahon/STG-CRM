import React from "react";
import {Skeleton} from "primereact/skeleton";
import {InputNumber, InputNumberChangeEvent} from "primereact/inputnumber";
import {ControlError} from "../../ControlError/ControlError.tsx";
import {FieldInputProps, FormikProps} from "formik";
interface IINPUT {
    field: FieldInputProps<any>
    form: FormikProps<any>,
    placeholder: string,
    isLoading: boolean
}
export const CustomInputNumber:React.FC<IINPUT> = (props) => {
    const { form, field, placeholder, isLoading } = props;
    const handleChange = (option:InputNumberChangeEvent) => {
        
        form?.setFieldValue(field?.name, option.value);
    };
    return (
        <>
            {isLoading ? (
                <Skeleton width="100%" height="3rem" />
            ) : (
                <>
                    <InputNumber
                        className="p-inputnumber-sm w-full"
                        placeholder={placeholder}
                        invalid={Boolean(form.errors[field.name])}
                        onChange={handleChange}
                        name={field?.name}
                        value={field?.value}
                    />
                    <ControlError form={form} field={field} />
                </>
            )}
        </>
    );
};