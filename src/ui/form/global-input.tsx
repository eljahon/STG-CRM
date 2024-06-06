import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";

const GlobalInput = ({
  placeholder,
  name,
  type,
  id,
  label,
  className,
  errors,
  formik,
  disabled,
  value,
  options = [],
  optionLabel,
  optionValue
}: any) => {
 
  return (
    <div className={` relative ${className && className}`}>
      <p className="label-my">{label} </p>
      {type == "text" && (
        <InputText
          className="w-full"
          id={id}
          name={name}
          value={value}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          invalid={Boolean(errors)}
          disabled={disabled}
        />
      )}
      {type == "select" && (
        <Dropdown
          className=" mr-2 w-full md:w-full"
          id={id}
          name={name}
          onChange={formik.handleChange}
          // onBlur={formik.handleBlur}
          value={value}
          placeholder={placeholder}
          options={options}
          disabled={disabled}
          optionValue={optionValue}
          optionLabel={optionLabel}
        />
      )}
      {errors && (
        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
          {errors}
        </p>
      )}
    </div>
  );
};

export default GlobalInput;
