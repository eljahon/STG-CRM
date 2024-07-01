import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

const SwichInputLoc = ({ value, formik, className, label }: any) => {
  return (
    <label
      className={`flex gap-4 align-items-center ${className && className}`}
    >
      <InputSwitch
        checked={value}
        onChange={(e: InputSwitchChangeEvent) => {
          formik.setFieldValue("visible", e.value);
        }}
      />
      <p className="label-my mb-0 ">{label}</p>
    </label>
  );
};

export default SwichInputLoc;
