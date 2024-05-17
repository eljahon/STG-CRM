import { useEffect, useState } from "react";
import GlobalFrom from "../../../ui/form/global-from.tsx";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
// import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { GetAllData, GetByIdData } from "../../../service/global.ts";

import UploadFile from "../../../ui/uploadFile";
import UploadFileMulty from "../../../ui/uploadFileMulty";
import UploadFileSer from "../../../ui/uploadFileSer";
import Loader from "../../../ui/loader";
import { useTranslation } from "react-i18next";

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

// [ { name: "O'g'it", "value": "ferti" }, { name: "Dori", "value": "drug" } ]

interface iItems {
  disease: any;
  dose_max: any;
  dose_min: any;
  unit: any;
  description?: string | undefined;
  method?: string | number;
  use_count?: string | number;
  crop?: string | number;
}
interface Istate {
  type: string | number;
  items?: iItems[] | any;
}
interface FormData {
  cer: string | number;
  description: string | undefined;
  drug_category: string | number;
  fertilizer_category: string | number;
  title: string | undefined;
  unit: string | number;
  state: Istate | any;
  price: string | undefined;
  gallery: string[];
  image: string;
}
export default function ProductAction() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [diseases, setdiseases] = useState<any>([]);
  const [cropsSet, setCropsSet] = useState<any>("");
  const [unitsSet, setUnitsSet] = useState<any>("");
  const [index, setIndex] = useState<any>(1);
  const [indexArr, setIndexArr] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [imageMulti, setImageMulti] = useState<any>([]);
  const [imageSer, setImageSer] = useState<any>();
  const [loader, setLoader] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormData>();

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
  
  const { setValue: setValuetest, watch: watchTest } = useForm<any>();
  const watchedFiles = watch();
  const watchedTestFiles = watchTest();
  const { data: crops } = useQuery(["crops", cropsSet], () =>
    GetAllData(`crops`, {
      filters: { name: { $containsi: cropsSet || undefined } }
    })
  );
  const { data: units } = useQuery(["units", unitsSet], () =>
    GetAllData(`units`, {
      filters: { name: { $containsi: unitsSet || undefined } }
    })
  );
  const { data: drugCategory } = useQuery("drugCategory", () =>
    GetAllData("drug-categories")
  );
  const { data: fertilizerCategory } = useQuery("fertilizerCategory", () =>
    GetAllData("fertilizer-categories")
  );
  const getDiseesesByCrop = async (crop?: string, diseases?: string) => {
    await GetAllData(`diseases`, {
      filters: {
        name: { $containsi: diseases || undefined },
        crop: crop || undefined
      }
    })
      .then((e) => {
        setdiseases(e?.data);
      })
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setValue("state.type", "drug");
    getDiseesesByCrop("");
  }, []);

  useEffect(() => {
    if (id == "new") {
      setIndexArr([1]);
    } else {
      setLoader(true);
      GetByIdData("products", id, { populate: "*" })
        .then((e) => {
          setIndexArr([]);
          setValue("title", e?.data?.title);
          setValue("description", e?.data?.description);
          setValue("unit", e?.data?.unit?.id);
          if (e?.data?.drug_category)
            setValue("drug_category", e?.data?.drug_category?.id);
          if (e?.data?.fertilizer_category)
            setValue("fertilizer_category", e?.data?.fertilizer_category?.id);
          setValue("price", e?.data?.price);
          setValue("state.type", e?.data?.state?.type);

          if (e?.data?.cer) {
            setValue("cer", e?.data?.cer?.id);
            setImageSer(e?.data?.cer?.aws_path);
          }
          if (e?.data?.image) {
            setValue("image", e?.data?.image?.id);
            setImage(e?.data?.image?.aws_path);
          }
          if (e?.data?.gallery?.length) {
            setValue(
              "gallery",
              e?.data?.gallery?.map((e: any) => e?.id)
            );
            setImageMulti(e?.data?.gallery);
          }
          e?.data?.state?.items?.length &&
            e?.data?.state?.items?.forEach((_: any, i: number) => {
              if (!indexArr.length)
                setIndexArr((state: any) => [i + 1, ...state]);
              if (e?.data?.state?.items?.[i]?.crop) {
                setValue(
                  `state.items[${i}].crop`,
                  e?.data?.state?.items?.[i]?.crop?.id
                );
              }
              if (e?.data?.state?.items?.[i]?.description) {
                setValue(
                  `state.items[${i}].description`,
                  e?.data?.state?.items?.[i]?.description
                );
              }
              if (e?.data?.state?.items?.[i]?.disease) {
                setValue(
                  `state.items[${i}].disease`,
                  e?.data?.state?.items?.[i]?.disease?.id
                );
              }
              setValuetest(
                `state.items[${i}].disease`,
                e?.data?.state?.items?.[i]?.disease
              );
              if (e?.data?.state?.items?.[i]?.dose_max) {
                setValue(
                  `state.items[${i}].dose_max`,
                  e?.data?.state?.items?.[i]?.dose_max
                );
              }
              if (e?.data?.state?.items?.[i]?.dose_min) {
                setValue(
                  `state.items[${i}].dose_min`,
                  e?.data?.state?.items?.[i]?.dose_min
                );
              }
              if (e?.data?.state?.items?.[i]?.unit) {
                setValue(
                  `state.items[${i}].unit`,
                  e?.data?.state?.items?.[i]?.unit?.id
                );
              }
              if (e?.data?.state?.items?.[i]?.use_count) {
                setValue(
                  `state.items[${i}].use_count`,
                  e?.data?.state?.items?.[i]?.use_count
                );
              }
              if (e?.data?.state?.items?.[i]?.method) {
                setValue(
                  `state.items[${i}].method`,
                  e?.data?.state?.items?.[i]?.method
                );
              }
            });
        })
        .catch((errors) => console.log(errors))
        .finally(() => setLoader(false));
    }
  }, [id]);

  // console.log(errors, watchedFiles);
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"products"}
      navUrl={"/product"}
      cancel={t("cancel")}
      title={`${t("product")} ${id == "new" ? t("add") : t("update")}`}
    >
      <div className="flex gap-4 ">
        <div className="w-8 bg-white border-round-3xl ">
          <div className="w-full flex gap-6 flex-wrap p-4  align-items-start">
            <div className="w-full flex gap-4 align-items-start">
              {/* floatLabel */}
              <div className="w-full relative">
                <InputText
                  className=" mr-2 w-full"
                  id="title"
                  placeholder={t("title")}
                  aria-label="title"
                  {...register(`title`, { required: t("titlerequired") })}
                  invalid={errors?.title?.message ? true : false}
                  value={watchedFiles?.title || ""}
                />
                {errors?.title?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.title?.message}
                  </p>
                )}
                {/* <label htmlFor="title">Title</label> */}
              </div>
              {/* floatLabel */}
              <div className="w-full relative">
                <InputText
                  type="number"
                  className="mr-2 w-full"
                  id="price"
                  placeholder={t("price")}
                  {...register(`price`, {
                    required: t("pricerequired"),
                    valueAsNumber: true
                  })}
                  value={watchedFiles?.price || ""}
                  invalid={errors?.price?.message ? true : false}
                />
                {errors?.price?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.price?.message}
                  </p>
                )}
                {/* <label htmlFor="price">Price</label> */}
              </div>
            </div>
            <div className="w-full flex gap-4  align-items-start">
              {/* floatLabel */}
              <div className="w-full">
                <Dropdown
                  className=" mr-2 w-full md:w-full"
                  onChange={(e) => {
                    setValue("state.type", e.value);
                    setIndex(1);
                    setIndexArr([1]);
                    setValue("state.items", null);
                    clearErrors();
                  }}
                  options={typeArr}
                  optionLabel="name"
                  disabled={id != "new"}
                  optionValue="code"
                  value={watchedFiles?.state?.type}
                  placeholder={`${t("selectType")} `}
                />
                {/* <label htmlFor="Type"> Type </label> */}
              </div>
              {/* floatLabel */}
              <div className="w-full relative">
                <Dropdown
                  filter
                  id="unit"
                  className=" mr-2 w-full md:w-full"
                  {...{
                    ...register("unit", { required: t("UnitRequired") }),
                    onChange: function (el) {
                      setValue("unit", el.value);
                      clearErrors("unit");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  filterTemplate={() => (
                    <InputText
                      onChange={debounce((e) => {
                        setUnitsSet(e.target.value);
                      }, 700)}
                    />
                  )}
                  onMouseDown={() => setUnitsSet("")}
                  invalid={errors?.unit?.message ? true : false}
                  placeholder={`${t("selectUnit")} `}
                  value={watchedFiles?.unit || ""}
                  options={units?.data}
                  optionValue="id"
                  optionLabel="name"
                  // checkmark={true}
                  highlightOnSelect={false}
                />
                {errors?.unit?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.unit?.message}
                  </p>
                )}
                {/* <label htmlFor="unit">Units </label> */}
              </div>
            </div>
            {watchedFiles?.state?.type == "drug" && (
              // floatLabel
              <div className="w-full relative">
                <Dropdown
                  filter
                  id="drug_category"
                  className=" mr-2 w-full md:w-full"
                  {...{
                    ...register("drug_category", {
                      required: t("drugCategoryrequired")
                    }),
                    onChange: function (el) {
                      setValue("drug_category", el.value);
                      clearErrors("drug_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={errors?.drug_category?.message ? true : false}
                  placeholder={`${t("selectdrugCategory")} `}
                  value={watchedFiles?.drug_category}
                  options={drugCategory?.data}
                  optionValue="id"
                  optionLabel="name"
                  // checkmark={true}
                  highlightOnSelect={false}
                />
                {errors?.drug_category?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.drug_category?.message}
                  </p>
                )}
                {/* <label htmlFor="drug_category">Drugs category </label> */}
              </div>
            )}
            {watchedFiles?.state?.type == "fertilizer" && (
              // floatLabel
              <div className="w-full relative">
                <Dropdown
                  filter
                  id="fertilizer"
                  className=" mr-2 w-full md:w-full"
                  {...{
                    ...register("fertilizer_category", {
                      required: t("fertilizerCategoryrequired")
                    }),
                    onChange: function (el) {
                      setValue("fertilizer_category", el.value);
                      clearErrors("fertilizer_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={errors?.fertilizer_category?.message ? true : false}
                  placeholder={`${t("selectFertilizerCategory")} `}
                  value={watchedFiles?.fertilizer_category}
                  options={fertilizerCategory?.data}
                  optionValue="id"
                  optionLabel="name"
                  // checkmark={true}
                  highlightOnSelect={false}
                />
                {errors?.fertilizer_category?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.fertilizer_category?.message}
                  </p>
                )}
                {/* <label htmlFor="fertilizer">Fertilizer category </label> */}
              </div>
            )}
            {/* floatLabel */}
            <div className="w-full relative">
              <InputTextarea
                className=" mr-2 w-full"
                id="description"
                placeholder={`${t("description")} `}
                rows={7}
                cols={20}
                {...register(`description`)}
                invalid={errors?.description?.message ? true : false}
                value={watchedFiles?.description || ""}
              />
              {/* <label htmlFor="description">Description</label> */}
              {errors?.description?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.description?.message}
                </p>
              )}
            </div>

            <UploadFileMulty
              className={"mb-4"}
              setValue={setValue}
              value={imageMulti || []}
              setLocalValue={setImageMulti}
              valueId={watchedFiles?.gallery || []}
              fieldName={"gallery"}
            />
          </div>
        </div>
        <div className="w-4 p-4 bg-white border-round-3xl">
          <UploadFile
            className={"mb-4"}
            setValue={setValue}
            value={image}
            setError={setError}
            clearErrors={clearErrors}
            error={errors}
            fieldName={"image"}
          />
          <UploadFileSer
            setValue={setValue}
            fieldName={"cer"}
            value={imageSer}
            setError={setError}
            clearErrors={clearErrors}
            error={errors}
          />
        </div>
      </div>

      <div className="p-4 bg-white border-round-3xl mt-4 mb-8">
        {indexArr?.map((_: any, i: any) => {
          return (
            <div key={i} className="flex align-items-start gap-3 mb-4">
              <div className="w-full">
                <div className="flex mb-4 gap-2">
                  {/* floatLabel */}
                  <div className="colm1">
                    <Dropdown
                      filter
                      id="crop"
                      onMouseDown={() => setCropsSet("")}
                      onScroll={(e) => console.log(e)}
                      className=" mr-2 w-full md:w-full"
                      onChange={(e) => {
                        if (watchedFiles?.state?.type == "fertilizer") {
                          setValue(`state.items[${i}].crop`, e.value);
                        } else {
                          getDiseesesByCrop(e.value);
                          setValuetest(`state.items[${i}].crop`, e.value);
                        }
                      }}
                      filterTemplate={() => (
                        <InputText
                          onChange={debounce((e) => {
                            setCropsSet(e.target.value);
                          }, 700)}
                        />
                      )}
                      value={
                        watchedFiles?.state?.items?.[i]?.crop ||
                        watchedTestFiles?.state?.items?.[i]?.crop
                      }
                      placeholder={`${t("selectCrop")} `}
                      optionValue="id"
                      options={crops?.data}
                      optionLabel="name"
                      checkmark={true}
                      highlightOnSelect={false}
                    />
                    {/* <label htmlFor="crop"> Crops</label> */}
                  </div>

                  {watchedFiles?.state?.type == "drug" && (
                    // floatLabel
                    <div className="colm1 relative">
                      <Dropdown
                        filter
                        id="disease"
                        filterTemplate={() => (
                          <InputText
                            onChange={debounce((e) => {
                              getDiseesesByCrop("", e.target.value);
                            }, 700)}
                          />
                        )}
                        className=" mr-2 w-full"
                        {...{
                          ...register(`state.items[${i}].disease`, {
                            required: t("diseaseRequired")
                          }),
                          onChange: function (el) {
                            setValue(`state.items[${i}].disease`, el.value);
                            clearErrors(`state.items[${i}].disease`);

                            setValuetest(
                              `state.items[${i}].disease`,
                              diseases.find((de: any) => de?.id == el.value)
                            );

                            return el.value;
                          },
                          onBlur: function () {}
                        }}
                        onMouseDown={() => {
                          getDiseesesByCrop(
                            watchedTestFiles?.state?.items?.[i]?.crop
                          );
                        }}
                        invalid={
                          (errors as any)?.state?.items?.[i]?.disease?.message
                            ? true
                            : false
                        }
                        value={watchedFiles?.state?.items?.[i]?.disease}
                        placeholder={`${t("selectDisease")} `}
                        optionValue="id"
                        options={
                          watchedTestFiles?.state?.items?.[i]?.disease
                            ? [
                                ...diseases,
                                watchedTestFiles?.state?.items?.[i]?.disease
                              ]
                            : diseases
                        }
                        optionLabel="name"
                        checkmark={true}
                        highlightOnSelect={false}
                      />
                      {(errors as any)?.state?.items?.[i]?.disease?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {(errors as any)?.state?.items?.[i]?.disease?.message}
                        </p>
                      )}
                      {/* <label htmlFor="disease">Diseases </label> */}
                    </div>
                  )}
                  {/* floatLabel */}
                  <div
                    className="relative w-full"
                    style={{ maxWidth: "155px" }}
                  >
                    <InputText
                      className="mr-2 w-full pb-3"
                      id="dose_min"
                      type="number"
                      placeholder={`${t("dose_min")} `}
                      aria-label="dose_min"
                      {...register(`state.items[${i}].dose_min`, {
                        // required: "dose_min is required",
                        valueAsNumber: true
                      })}
                      invalid={
                        (errors as any)?.state?.items?.[i]?.dose_min?.message
                          ? true
                          : false
                      }
                      value={
                        watchedFiles?.state?.items?.[i]?.dose_min || undefined
                      }
                    />
                    {(errors as any)?.state?.items?.[i]?.dose_min?.message && (
                      <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                        {(errors as any)?.state?.items?.[i]?.dose_min?.message}
                      </p>
                    )}
                    {/* <label htmlFor="dose_min">dose_min</label> */}
                  </div>
                  {/* floatLabel */}
                  <div
                    className="colm1 relative w-full"
                    style={{ maxWidth: "155px" }}
                  >
                    <InputText
                      type="number"
                      className="mr-2 w-full pb-3"
                      id="dose_max"
                      placeholder={`${t("dose_max")} `}
                      {...register(`state.items[${i}].dose_max`, {
                        // required: "dose_max is required",
                        valueAsNumber: true
                      })}
                      value={
                        watchedFiles?.state?.items?.[i]?.dose_max || undefined
                      }
                      invalid={
                        (errors as any)?.state?.items?.[i]?.dose_max?.message
                          ? true
                          : false
                      }
                    />
                    {(errors as any)?.state?.items?.[i]?.dose_max?.message && (
                      <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                        {(errors as any)?.state?.items?.[i]?.dose_max?.message}
                      </p>
                    )}
                    {/* <label htmlFor="dose_max">Dose_max</label> */}
                  </div>

                  {/* floatLabel */}
                  <div
                    className="colm1 relative w-full"
                    style={{ maxWidth: "150px" }}
                  >
                    <Dropdown
                      filter
                      id="unit"
                      className="mr-2 w-full"
                      {...{
                        ...register(`state.items[${i}].unit`, {
                          required: t("UnitRequired")
                        }),
                        onChange: function (el) {
                          setValue(`state.items[${i}].unit`, el.value);
                          clearErrors(`state.items[${i}].unit`);
                          return el.value;
                        },
                        onBlur: function () {}
                      }}
                      invalid={
                        (errors as any)?.state?.items?.[i]?.unit?.message
                          ? true
                          : false
                      }
                      value={watchedFiles?.state?.items?.[i]?.unit}
                      placeholder={`${t("selectUnit")} `}
                      optionValue="id"
                      options={units?.data}
                      optionLabel="name"
                      onMouseDown={() => setUnitsSet("")}
                      checkmark={true}
                      filterTemplate={() => (
                        <InputText
                          onChange={debounce((e) => {
                            setUnitsSet(e.target.value);
                          }, 700)}
                        />
                      )}
                      highlightOnSelect={false}
                    />
                    {(errors as any)?.state?.items?.[i]?.unit?.message && (
                      <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                        {(errors as any)?.state?.items?.[i]?.unit?.message}
                      </p>
                    )}
                    {/* <label htmlFor="unit">Units </label> */}
                  </div>
                  {watchedFiles?.state?.type == "fertilizer" && (
                    // floatLabel
                    <div className="colm1 relative">
                      <InputText
                        className="mr-2 w-full pb-3"
                        id="use_count"
                        type="number"
                        placeholder={`${t("use_count")} `}
                        aria-label="dose_min"
                        {...register(`state.items[${i}].use_count`, {
                          // required: "use_count is required",
                          valueAsNumber: true
                        })}
                        invalid={
                          (errors as any)?.state?.items?.[i]?.use_count?.message
                            ? true
                            : false
                        }
                        value={watchedFiles?.state?.items?.[i]?.use_count || ""}
                      />
                      {(errors as any)?.state?.items?.[i]?.use_count
                        ?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {
                            (errors as any)?.state?.items?.[i]?.use_count
                              ?.message
                          }
                        </p>
                      )}
                      {/* <label htmlFor="use_count">use_count</label> */}
                    </div>
                  )}
                </div>
                {/* floatLabel */}
                <div className="w-full relative">
                  {watchedFiles?.state?.type == "drug" ? (
                    <>
                      <InputTextarea
                        className=" mr-2 w-full"
                        id="descriptionitems"
                        placeholder={`${t("description")}`}
                        rows={4}
                        cols={20}
                        {...register(`state.items[${i}].description`)}
                        value={watchedFiles?.state?.items?.[i]?.description}
                        invalid={
                          (errors as any)?.state?.items?.[i]?.description
                            ?.message
                            ? true
                            : false
                        }
                      />
                      {/* <label htmlFor="descriptionitems">description</label> */}
                      {(errors as any)?.state?.items?.[i]?.description
                        ?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {
                            (errors as any)?.state?.items?.[i]?.description
                              ?.message
                          }
                        </p>
                      )}
                    </>
                  ) : watchedFiles?.state?.type == "fertilizer" ? (
                    <>
                      <InputTextarea
                        className=" mr-2 w-full"
                        id="method"
                        placeholder={`${t("method")}`}
                        rows={4}
                        cols={20}
                        {...register(`state.items[${i}].method`)}
                        value={watchedFiles?.state?.items?.[i]?.method || ""}
                        invalid={
                          (errors as any)?.state?.items?.[i]?.method?.message
                            ? true
                            : false
                        }
                      />
                      {/* <label htmlFor="method">method</label> */}
                      {(errors as any)?.state?.items?.[i]?.method?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {(errors as any)?.state?.items?.[i]?.method?.message}
                        </p>
                      )}
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Button
                className="w-2 max-w-3rem border-round-3xl"
                // label={t("delete")}
                type="button"
                severity="danger"
                icon="pi pi-trash"
                onClick={() => {
                  clearErrors();
                  setValue(
                    `state.items`,
                    watchedFiles?.state?.items?.filter(
                      (_: any, index: any) => index !== i
                    )
                  );
                  setIndexArr((state: any) =>
                    state.length > 1 ? state?.slice(0, -1) : state
                  );
                }}
              />
            </div>
          );
        })}

        <Button
          label={t("add")}
          type="button"
          severity="success"
          className="border-round-3xl px-5"
          onClick={() => {
            setIndex(index + 1);
            setIndexArr((state: any) => [index + 1, ...state]);
            clearErrors();
          }}
        />
      </div>

      {loader && <Loader />}
    </GlobalFrom>
  );
}
