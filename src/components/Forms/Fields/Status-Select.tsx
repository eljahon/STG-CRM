import { Dropdown } from "primereact/dropdown";
import { ControlError } from "../../ControlError/ControlError.tsx";
import { Skeleton } from "primereact/skeleton";

const statusList = [
  { id: "active", name: "Active" },
  { id: "inactive", name: "Inactive" },
];

export const StatudsSelect = (props) => {
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
            options={statusList}
            optionLabel={"name"}
            optionValue={"id"}
          />
          <ControlError form={form} field={field} />
        </>
      )}
    </>
  );
};
