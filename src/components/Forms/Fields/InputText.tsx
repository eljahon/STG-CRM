import React from "react";
import {Skeleton} from "primereact/skeleton";
import {InputText} from "primereact/inputtext";
import {ControlError} from "../../ControlError/ControlError.tsx";
import {FieldInputProps, FormikProps} from "formik";
interface IINPUT {
    field: FieldInputProps<any>
    form: FormikProps<any>,
    placeholder: string,
    isLoading: boolean
}
export const CustomInputText:React.FC<IINPUT> = (props) => {
    const { form, field, placeholder, isLoading } = props;
    const handleChange = (option: React.ChangeEvent<HTMLInputElement>) => {
        form?.setFieldValue(field?.name, option.target.value);
    };
    return (
        <>
            {isLoading ? (
                <Skeleton width="100%" height="3rem" />
            ) : (
                <>
                    <InputText
                        type={field?.name === "password" ? "password" : "text"}
                        className="p-inputtext-sm w-full"
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