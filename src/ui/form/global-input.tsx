import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { MultiSelect } from "primereact/multiselect";

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
  cols,
  typeValue,
  filter,
  required,
  loading
}: any) => {
  const debounce = <F extends (...args: any[]) => any>(
    func: F,
    delay: number
  ): ((...args: Parameters<F>) => void) => {
    let timerId: any;
    return (...args: Parameters<F>) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  return (
    <div className={` relative ${className && className}`}>
      <p className="label-my">{label} </p>
      {type == "text" && (
        <InputText
          className="w-full pb-3"
          id={id}
          name={name}
          type={typeValue || "text"}
          value={value}
          onChange={(e) => {
            formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onBlur={formik.handleBlur}
          placeholder={placeholder}
          invalid={Boolean(errors || required)}
          disabled={disabled}
          required={required}
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
          invalid={Boolean(errors || required)}
          disabled={disabled}
          rows={rows}
          cols={cols}
          required={required}
        />
      )}
      {type == "select" && (
        <Dropdown
          className=" mr-2 w-full"
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
          filter={filter ? true : false}
          invalid={Boolean(errors || required)}
          onFilter={debounce((e) => {
            filter(e.filter);
          }, 700)}
          loading={loading}
          required={required}
        />
      )}
      {type == "multi" && (
        <MultiSelect
          id={id}
          maxSelectedLabels={2}
          onFilter={debounce((e) => {
            filter(e.filter);
          }, 700)}
          className="mr-2 w-full"
          onChange={(e) => {
            // formik.handleChange(e);
            if (localChange) localChange(e);
          }}
          onBlur={formik.handleBlur}
          invalid={Boolean(errors || required)}
          optionValue={optionValue}
          value={value}
          placeholder={placeholder}
          options={options}
          filter
          optionLabel={optionLabel}
          required={required}
          loading={loading}
        />
      )}

      {required ? (
        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
          {"Required"}
        </p>
      ) : (
        errors && (
          <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
            {errors}
          </p>
        )
      )}
    </div>
  );
};

export default GlobalInput;
