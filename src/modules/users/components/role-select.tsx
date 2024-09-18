import { Dropdown } from "primereact/dropdown";
import { ControlError } from "../../../components/ControlError/ControlError";
import { userRoleList } from "../../../constants";
import { Skeleton } from "primereact/skeleton";

export const RoleSelect = (props) => {
  const { form, field, placeholder, isLoading } = props;

  const handleOnChage = (event: React.ChangeEvent<HTMLInputElement>) => {
    form.setFieldValue(field?.name, event.target.value);
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
            options={userRoleList}
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
