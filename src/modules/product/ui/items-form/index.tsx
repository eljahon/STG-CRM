import { Button } from "primereact/button";
import { useTranslation } from "react-i18next";
import GlobalInput from "../../../../ui/form/global-input";

const Itemsform = ({
  arrayHelpers,
  cropArr,
  filterCrop,
  diseasesArr,
  formik,
  index,
  cropChange,
  filterDiseeses,
  unitArr,
  loaderDis,
  loaderCrop
}: any) => {
  const { t } = useTranslation();
  return (
    <div className="flex align-items-start gap-3 mb-4 w-full">
      <div className="flex align-items-start gap-3 mb-4 w-full">
        {formik.values.type == "drug" && (
          <>
            <GlobalInput
              type="select"
              filter={filterCrop}
              formik={formik}
              value={formik.values.state.items?.[index]?.crop}
              label={`${t("selectCrop")} `}
              name={`state.items.${index}.crop`}
              id={"crop"}
              className={"mb-4 colm3"}
              options={cropArr}
              optionLabel="name"
              optionValue="id"
              localChange={(e: any) => {
                cropChange(e?.value);
                formik.setFieldValue(`state.items.${index}.diseases`, []);
              }}
              placeholder={`${t("selectCrop")}`}
              loading={loaderCrop}
            />

            <GlobalInput
              type="multi"
              formik={formik}
              filter={filterDiseeses}
              value={formik.values.state.items?.[index]?.diseases}
              label={`${t("selectDisease")} `}
              name={`state.items.${index}.diseases`}
              id={"diseases"}
              className={"mb-4 colm3"}
              options={diseasesArr}
              optionLabel="name"
              optionValue="id"
              loading={loaderDis}
              localChange={(e: any) => {
                formik.setFieldValue(`state.items.${index}.diseases`, e.value);
              }}
              placeholder={`${t("selectDisease")} `}
              required={
                !formik.values.state.items?.[index]?.diseases ? true : false
              }
            />
          </>
        )}
        {formik.values.type == "fertilizer" && (
          <GlobalInput
            type="multi"
            formik={formik}
            filter={filterCrop}
            value={formik.values.state.items?.[index]?.crops}
            name={`state.items.${index}.crops`}
            label={`${t("selectCrop")} `}
            id={"crops"}
            className={"mb-4 colm3"}
            options={cropArr}
            optionLabel="name"
            optionValue="id"
            localChange={(e: any) => {
              formik.setFieldValue(`state.items.${index}.crops`, e.value);
            }}
            placeholder={`${t("selectCrop")} `}
            required={!formik.values.state.items?.[index]?.crops ? true : false}
            loading={loaderCrop}
          />
        )}
        <GlobalInput
          type="text"
          typeValue="number"
          formik={formik}
          value={formik.values.state.items?.[index]?.dose_min}
          name={`state.items.${index}.dose_min`}
          placeholder={`${t("dose_min")} `}
          label={t("dose_min")}
          id={"dose_min"}
          className={"mb-4 colm3"}
          required={
            !formik.values.state.items?.[index]?.dose_min ? true : false
          }
        />
        <GlobalInput
          type="text"
          typeValue="number"
          formik={formik}
          value={formik.values.state.items?.[index]?.dose_max}
          name={`state.items.${index}.dose_max`}
          placeholder={`${t("dose_max")} `}
          label={t("dose_max")}
          id={"dose_max"}
          className={"mb-4 colm3"}
          required={
            !formik.values.state.items?.[index]?.dose_max ? true : false
          }
        />
        <GlobalInput
          type="select"
          formik={formik}
          value={formik.values.state.items?.[index]?.unit}
          label={`${t("selectCrop")} `}
          name={`state.items.${index}.unit`}
          id={"unit"}
          className={"mb-4 colm3"}
          options={unitArr}
          optionLabel="name"
          optionValue="id"
          placeholder={`${t("selectCrop")}`}
          required={!formik.values.state.items?.[index]?.unit ? true : false}
        />
        {formik.values.type == "fertilizer" && (
          <GlobalInput
            type="text"
            typeValue="number"
            formik={formik}
            value={formik.values.state.items?.[index]?.use_count}
            name={`state.items.${index}.use_count`}
            placeholder={`${t("use_count")} `}
            label={t("use_count")}
            id={"use_count"}
            className={"mb-4 colm3"}
            errors={formik.errors.use_count}
          />
        )}
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
