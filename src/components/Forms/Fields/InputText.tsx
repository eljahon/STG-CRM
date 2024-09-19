import React from "react";
import {Skeleton} from "primereact/skeleton";
import {InputText} from "primereact/inputtext";
import {ControlError} from "../../ControlError/ControlError.tsx";

export const CustomInputText = (props) => {
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
                        invalid={form.errors[field.name]}
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