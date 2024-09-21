import {Dropdown, DropdownChangeEvent} from "primereact/dropdown";
import { ControlError } from "../../ControlError/ControlError.tsx";
import { Skeleton } from "primereact/skeleton";
import React from "react";
import {FieldInputProps, FormikProps} from "formik";
interface ISELECT {
  field: FieldInputProps<any>
  form: FormikProps<any>
  placeholder: string,
  isLoading: boolean,
  options: any[]
}
export const RoleSelect:React.FC<ISELECT> = (props) => {
  const { form, field, placeholder, isLoading, options } = props;

  const handleOnChage = (event: DropdownChangeEvent) => {
    const value = event.target.value
    if(value) form.setFieldValue(field?.name, event.target.value);
  };
  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="3rem" />
      ) : (
        <>
          <Dropdown
            className="p-inputtext-sm w-full"
            value={field?.value}
            placeholder={placeholder}
            onChange={handleOnChage}
            options={options}
            optionLabel={"name"}
            optionValue={"id"}
            defaultValue={field?.value}
          />
          <ControlError form={form} field={field} />
        </>
      )}
    </>
  );
};
