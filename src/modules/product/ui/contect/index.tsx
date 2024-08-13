import { useTranslation } from "react-i18next";
import GlobalInput from "../../../../ui/form/global-input";
import UploadFile from "../../../../ui/uploadFile";
import UploadFileSer from "../../../../ui/uploadFileSer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UploadFileMulty from "../../../../ui/uploadFileMulty";

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
  productOne,
  fertilizerCategory
}: any) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [imageMulti, setImageMulti] = useState<any>(productOne?.gallery || []);

  useEffect(() => {
    setImageMulti(productOne?.gallery || []);
  }, [productOne?.gallery]);

  return (
    <div className="flex gap-4 flex-wrap lg:flex-nowrap">
      <div className="w-full  lg:w-8 bg-white border-round-3xl p-4  gap-2 flex flex-wrap">
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
            formik.setFieldValue("state.items", [""]);
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
            required={
              !formik.values.state?.drug_category && formik.values.title
                ? true
                : false
            }
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
            required={
              !formik.values.state?.fertilizer_category && formik.values.title
                ? true
                : false
            }
          />
        )}

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
        <UploadFileMulty
          className={"mb-4"}
          formik={formik}
          value={imageMulti || []}
          setLocalValue={setImageMulti}
          fieldName={"gallery"}
        />
      </div>
      <div className="w-full  lg:w-4 p-4 bg-white border-round-3xl">
        <UploadFile
          className={"mb-4"}
          formik={formik}
          value={productOne?.image?.aws_path}
          error={formik.errors}
          fieldName={"image"}
        />
        <UploadFileSer
          formik={formik}
          fieldName={"cer"}
          type={productOne?.cer?.mime_type}
          value={productOne?.cer?.aws_path}
          error={formik.errors}
        />
      </div>
    </div>
  );
};

export default ProductContentInputs;
