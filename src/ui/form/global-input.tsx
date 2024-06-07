import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";

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
  localChange,
  options = [],
  optionLabel,
  optionValue,
  rows,
  cols
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
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          invalid={Boolean(errors)}
          disabled={disabled}
        />
      )}
      {type == "textarea" && (
        <InputTextarea
          className="w-full"
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          invalid={Boolean(errors)}
          disabled={disabled}
          rows={rows}
          cols={cols}
        />
      )}
      {type == "select" && (
        <Dropdown
          className=" mr-2 w-full md:w-full"
          id={id}
          name={name}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onBlur={formik.handleBlur}
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
