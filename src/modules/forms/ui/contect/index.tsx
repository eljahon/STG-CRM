import { InputText } from "primereact/inputtext";
import { useTranslation } from "react-i18next";
import GlobalInput from "../../../../ui/form/global-input";
import UploadFile from "../../../../ui/uploadFile";
import UploadFileSer from "../../../../ui/uploadFileSer";
import { useParams } from "react-router-dom";
import SwichInputLoc from "../../../../ui/form/swich-input";

const typeArr: any = [
  {
    code: "drug",
    name: "Dori"
  },
  {
    code: "fertilizer",
    name: "O'g'it"
  }
];

const ProductContentInputs = ({
  formik,
  unitOption,
  drugCategory,
  fertilizerCategory
}: any) => {
  const { t } = useTranslation();
  const { id } = useParams();
  return (
    <div className="flex gap-4">
      <div className="w-8 bg-white border-round-3xl p-4  gap-2 flex flex-wrap">
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
        <GlobalInput
          type="text"
          formik={formik}
          value={formik.values.price}
          label={t("price")}
          name={"price"}
          id={"price"}
          className={"mb-4 colm2"}
          placeholder={t("price")}
          errors={formik.errors.price}
        />
        <GlobalInput
          type="select"
          formik={formik}
          value={formik.values.type}
          label={t("selectType")}
          name={"type"}
          id={"type"}
          className={"mb-4 colm2"}
          options={typeArr}
          optionLabel="name"
          localChange={() => {
            formik.setFieldValue("state", null);
          }}
          disabled={id != "new"}
          optionValue="code"
          placeholder={t("selectType")}
          errors={formik.errors.type}
        />
        <GlobalInput
          type="select"
          formik={formik}
          value={formik.values.unit}
          label={t("selectUnit")}
          name={"unit"}
          id={"unit"}
          className={"mb-4 colm2"}
          options={unitOption}
          optionLabel="name"
          optionValue="id"
          placeholder={`${t("selectUnit")}`}
          errors={formik.errors.unit}
        />
        {formik.values.type == "drug" && (
          <GlobalInput
            type="select"
            formik={formik}
            value={formik.values.state?.drug_category}
            label={t("drugCategoryrequired")}
            name={"state.drug_category"}
            id={"drug_category"}
            className={"mb-4 colm2"}
            options={drugCategory}
            optionLabel="name"
            optionValue="id"
            placeholder={t("drugCategoryrequired")}
            errors={formik.errors.state?.drug_category}
          />
        )}
        {formik.values.type == "fertilizer" && (
          <GlobalInput
            type="select"
            formik={formik}
            value={formik.values.state?.fertilizer_category}
            label={t("fertilizerCategoryrequired")}
            name={"state.fertilizer_category"}
            id={"fertilizer_category"}
            className={"mb-4 colm2"}
            options={fertilizerCategory}
            optionLabel="name"
            optionValue="id"
            placeholder={t("fertilizerCategoryrequired")}
            errors={formik.errors.state?.fertilizer_category}
          />
        )}

        <SwichInputLoc
          formik={formik}
          className={"mb-4 mt-3 colm2"}
          value={formik.values.visible}
          label={t("visible")}
        />
        <GlobalInput
          type="textarea"
          formik={formik}
          value={formik.values.description}
          label={t("description")}
          name={"description"}
          id={"description"}
          className={"mb-4 w-full"}
          placeholder={t("description")}
          errors={formik.errors.description}
          rows={7}
          cols={20}
        />
      </div>
      <div className="w-4 p-4 bg-white border-round-3xl">
        {/* <UploadFile
          className={"mb-4"}
          setValue={setValue}
          value={image}
          setError={setError}
          clearErrors={clearErrors}
          error={errors}
          fieldName={"image"}
        /> */}
        {/* <UploadFileSer
          setValue={setValue}
          fieldName={"cer"}
          value={imageSer}
          setError={setError}
          clearErrors={clearErrors}
          error={errors}
        /> */}
      </div>
    </div>
  );
};

export default ProductContentInputs;
