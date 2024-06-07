import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import GlobalInput from "../../../../ui/form/global-input";

const Itemsform = ({ arrayHelpers, value, formik, index }: any) => {
  const { t } = useTranslation();
  console.log(value)
  return (
    <div className="flex align-items-start gap-3 mb-4 w-full">
      <div className="flex align-items-start gap-3 mb-4 w-full">
        <GlobalInput
          type="text"
          formik={formik}
          value={formik.values.title}
          label={t("title")}
          name={"title"}
          id={"title"}
          placeholder={t("title")}
          className={"mb-4 colm2"}
          errors={formik.errors.title}
        />
      </div>
      <Button
        className="w-2 max-w-3rem border-round-3xl"
        // label={t("delete")}
        type="button"
        severity="danger"
        icon="pi pi-trash"
        onClick={() => arrayHelpers.remove(index)}
      />
    </div>
  );
};

export default Itemsform;
