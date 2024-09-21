import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { ControlError } from "../../ControlError/ControlError.tsx";
import { Skeleton } from "primereact/skeleton";
import { FieldInputProps, FormikProps } from "formik";
import { get } from "lodash";

const statusList = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
];
interface Props {
  form: FormikProps<any>;
  field: FieldInputProps<any>;
  placeholder: string;
  isLoading: boolean;
  optionsProp: any;
}

export const StatudsSelect:React.FC<Props> = (props) => {
  const { form, field, placeholder, isLoading,optionsProp } = props;

  const handleOnChage = (event: DropdownChangeEvent) => {
    form.setFieldValue(get(field, "name", "") as string, get(event, 'target.value'));
  };

  return (
    <>
      {isLoading ? (
        <Skeleton width="100%" height="3rem" />
      ) : (
        <>
          <Dropdown
            className="p-inputtext-sm w-full"
            value={get(field, 'value', "")}
            placeholder={placeholder}
            onChange={handleOnChage}
            options={Array.isArray(optionsProp ) ? optionsProp : statusList}
            optionLabel={"name"}
            optionValue={"id"}
          />
          <ControlError {...{ form, field }} />
        </>
      )}
    </>
  );
};
