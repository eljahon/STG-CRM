import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import GlobalInput from "../../../../ui/form/global-input";

const Itemsform = ({ arrayHelpers, cropArr, formik, index }: any) => {
  const { t } = useTranslation();
  return (
    <div className="flex align-items-start gap-3 mb-4 w-full">
      <div className="flex align-items-start gap-3 mb-4 w-full">
        <GlobalInput
          type="select"
          formik={formik}
          value={formik.values.state.items?.[index]?.crop}
          label={`${t("selectCrop")} `}
          name={`state.items.${index}.crop`}
          id={"title"}
          className={"mb-4 colm2"}
          options={cropArr}
          optionLabel="name"
          optionValue="id"
          placeholder={`${t("selectCrop")} `}
          errors={formik.errors.crop}
        />
      </div>
      <Button
        className="w-2 max-w-3rem border-round-3xl"
        type="button"
        severity="danger"
        icon="pi pi-trash"
        onClick={() => arrayHelpers.remove(index)}
      />
    </div>
  );
};

export default Itemsform;
