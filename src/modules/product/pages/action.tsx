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
import { MultiSelect } from "primereact/multiselect";
import lodash from "lodash";
import ProductItems from "../ui/items/index.tsx";

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

interface iItems {
  diseases: any;
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
  type: string | number;
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
  const [unitsSet, setUnitsSet] = useState<any>("");
  const [updateCrop, setupdateCrop] = useState([]);
  const [updatedeases, setupdatedeases] = useState([]);
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
  const watchedFiles = watch();

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
  const watchedTestFiles = watchTest();

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

  const { data: fertilizerItems } = useQuery(
    ["fertilizerItems", watchedTestFiles.fertilizerId],
    () =>
      GetAllData("fertilizations", {
        filters: {
          fertilizer: { id: { $eq: watchedTestFiles.fertilizerId } }
        },
        populate: "*"
      }),
    {
      enabled:
        watchedTestFiles?.confirmed && watchedFiles?.type == "fertilizer"
          ? true
          : false
    }
  );

  const { data: drugItems } = useQuery(
    ["drugItems", watchedTestFiles.drugId],
    () =>
      GetAllData("treatments", {
        filters: { drug: { id: { $eq: watchedTestFiles.drugId } } },
        populate: "*"
      }),
    {
      enabled:
        watchedTestFiles?.confirmed && watchedFiles?.type == "drug"
          ? true
          : false
    }
  );

  const getCrop = async (crop?: string, indexNumber?: any) => {
    await GetAllData(`crops`, {
      filters: { name: { $containsi: crop || undefined } }
    })
      .then((e) => {
        const newArr = watchedTestFiles?.corps?.[indexNumber]
          ? [...watchedTestFiles?.corps?.[indexNumber], ...e?.data]
          : e?.data;
        const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
        setValuetest(`corps[${indexNumber}]`, uniqueUsersByName);
      })
      .catch((errors) => console.log(errors));
  };
  const getDiseesesByCrop = async (
    crop?: string,
    diseases?: string,
    indexNumber?: any,
    isfilter?: any
  ) => {
    await GetAllData(`diseases`, {
      filters: {
        name: { $containsi: diseases || undefined },
        crop: crop || undefined
      }
    })
      .then((e) => {
        if (isfilter) {
          setValuetest(`diseases[${indexNumber}]`, e?.data);
          setValue(`state.items[${indexNumber}].diseases`, null);
        } else {
          const newArr = watchedTestFiles?.diseases?.[indexNumber]
            ? [...watchedTestFiles?.diseases?.[indexNumber], ...e?.data]
            : e?.data;

          const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
          setValuetest(`diseases[${indexNumber}]`, uniqueUsersByName);
        }
      })
      .catch((errors) => console.log(errors));
  };

  useEffect(() => {
    setValue("type", "drug");
  }, []);

  useEffect(() => {
    getDiseesesByCrop("", "", index - 1);
    getCrop("", index - 1);
  }, [index]);

  useEffect(() => {
    if (id == "new") {
      setIndexArr([1]);
    } else {
      setLoader(true);
      GetByIdData("products", id, { populate: "*" })
        .then((e) => {
          setIndexArr([]);
          setValuetest("confirmed", e?.data?.confirmed);
          setValuetest("update", true);
          setValue("title", e?.data?.title);
          setValue("description", e?.data?.description);
          setValue("unit", e?.data?.unit?.id);

          if (e?.data?.state?.drug_category)
            setValue("state.drug_category", e?.data?.state?.drug_category?.id);
          if (e?.data?.state?.fertilizer_category)
            setValue(
              "state.fertilizer_category",
              e?.data?.state?.fertilizer_category?.id
            );
          setValue("type", e?.data?.type);
          setValue("price", e?.data?.price);

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
          if (e?.data?.drug) {
            setValuetest("drugId", e?.data?.drug?.id);
          }
          if (e?.data?.fertilizer) {
            setValuetest("fertilizerId", e?.data?.fertilizer?.id);
          }
          if (!e?.data?.confirmed) {
            e?.data?.state?.items?.length &&
              e?.data?.state?.items?.forEach((_: any, i: number) => {
                if (!indexArr.length)
                  setIndexArr((state: any) => [i + 1, ...state]);
                if (e?.data?.state?.items?.[i]?.crops) {
                  setValue(
                    `state.items[${i}].crops`,
                    e?.data?.state?.items?.[i]?.crops?.map((e: any) => e?.id)
                  );
                  setValuetest(
                    `cropsUpdate[${i}]`,
                    e?.data?.state?.items?.[i]?.crops
                  );
                  setupdateCrop(e?.data?.state?.items?.[i]?.crops || []);
                }
                if (e?.data?.state?.items?.[i]?.description) {
                  setValue(
                    `state.items[${i}].description`,
                    e?.data?.state?.items?.[i]?.description
                  );
                }
                if (e?.data?.state?.items?.[i]?.diseases) {
                  setValue(
                    `state.items[${i}].diseases`,
                    e?.data?.state?.items?.[i]?.diseases?.map((e: any) => e?.id)
                  );
                  setValuetest(
                    `diseasesUpdate[${i}]`,
                    e?.data?.state?.items?.[i]?.diseases
                  );
                  setupdatedeases(e?.data?.state?.items?.[i]?.diseases || []);
                }

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
          }
        })
        .catch((errors) => console.log(errors))
        .finally(() => setLoader(false));
    }
  }, [id]);

  useEffect(() => {
    indexArr?.forEach((_: any, i: number) => {
      const newArr =
        watchedTestFiles?.cropsUpdate?.[i] && watchedTestFiles?.corps?.[i]
          ? [
              ...watchedTestFiles?.cropsUpdate?.[i],
              ...watchedTestFiles?.corps?.[i]
            ]
          : watchedTestFiles?.corps?.[i];
      const uniqueUsersByName: any = lodash.uniqBy(newArr, "id");
      setValuetest(`corps[${i}]`, uniqueUsersByName);

      const newArr1 =
        watchedTestFiles?.diseasesUpdate?.[i] && watchedTestFiles?.diseases?.[i]
          ? [
              ...watchedTestFiles?.diseasesUpdate?.[i],
              ...watchedTestFiles?.diseases?.[i]
            ]
          : watchedTestFiles?.diseases?.[i];
      const uniqueUsersByName1: any = lodash.uniqBy(newArr1, "id");
      setValuetest(`diseases[${i}]`, uniqueUsersByName1);
    });
  }, [updateCrop, updatedeases]);

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
              <div className="w-full">
                <Dropdown
                  className=" mr-2 w-full md:w-full"
                  onChange={(e) => {
                    setValue("type", e.value);
                    setIndex(1);
                    setIndexArr([1]);
                    setValue("state.items", null);
                    clearErrors();
                  }}
                  options={typeArr}
                  optionLabel="name"
                  disabled={id != "new"}
                  optionValue="code"
                  value={watchedFiles?.type}
                  placeholder={`${t("selectType")} `}
                />
                {/* <label htmlFor="Type"> Type </label> */}
              </div>
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
                  // onMouseDown={() => setUnitsSet("")}
                  invalid={errors?.unit?.message ? true : false}
                  placeholder={`${t("selectUnit")} `}
                  value={watchedFiles?.unit || ""}
                  options={units?.data}
                  optionValue="id"
                  optionLabel="name"
                  highlightOnSelect={false}
                />
                {errors?.unit?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {errors?.unit?.message}
                  </p>
                )}
              </div>
            </div>
            {watchedFiles?.type == "drug" && (
              <div className="w-full relative">
                <Dropdown
                  filter
                  id="drug_category"
                  className=" mr-2 w-full md:w-full"
                  {...{
                    ...register("state.drug_category", {
                      required: t("drugCategoryrequired")
                    }),
                    onChange: function (el) {
                      setValue("state.drug_category", el.value);
                      clearErrors("state.drug_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={
                    (errors as any)?.state?.drug_category?.message
                      ? true
                      : false
                  }
                  placeholder={`${t("selectdrugCategory")} `}
                  value={watchedFiles?.state?.drug_category}
                  options={drugCategory?.data}
                  optionValue="id"
                  optionLabel="name"
                  highlightOnSelect={false}
                />
                {(errors as any)?.state?.drug_category?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {(errors as any)?.state?.drug_category?.message}
                  </p>
                )}
              </div>
            )}
            {watchedFiles?.type == "fertilizer" && (
              // floatLabel
              <div className="w-full relative">
                <Dropdown
                  filter
                  id="fertilizer"
                  className=" mr-2 w-full md:w-full"
                  {...{
                    ...register("state.fertilizer_category", {
                      required: t("fertilizerCategoryrequired")
                    }),
                    onChange: function (el) {
                      setValue("state.fertilizer_category", el.value);
                      clearErrors("state.fertilizer_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={
                    (errors as any)?.state?.fertilizer_category?.message
                      ? true
                      : false
                  }
                  placeholder={`${t("selectFertilizerCategory")} `}
                  value={watchedFiles?.state?.fertilizer_category}
                  options={fertilizerCategory?.data}
                  optionValue="id"
                  optionLabel="name"
                  // checkmark={true}
                  highlightOnSelect={false}
                />
                {(errors as any)?.state?.fertilizer_category?.message && (
                  <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                    {(errors as any)?.state?.fertilizer_category?.message}
                  </p>
                )}
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
      {!watchedTestFiles?.confirmed ? (
        <div className="p-4 bg-white border-round-3xl mt-4 mb-8">
          {indexArr?.map((_: any, i: any) => {
            return (
              <div key={i} className="flex align-items-start gap-3 mb-4">
                <div className="w-full">
                  <div className="flex mb-4 gap-2">
                    {watchedFiles?.type == "drug" && (
                      <div className="colm1">
                        <Dropdown
                          filter
                          id="crop"
                          className=" mr-2 w-full md:w-full"
                          onChange={(e) => {
                            getDiseesesByCrop(e.value, "", i, true);
                            if (e.value) {
                              setValuetest(`state.items[${i}].crop`, e.value);
                            }
                          }}
                          filterTemplate={() => (
                            <InputText
                              className="w-full"
                              onChange={debounce((e) => {
                                if (e.target.value) {
                                  getCrop(e.target.value, i);
                                }
                              }, 700)}
                            />
                          )}
                          value={watchedTestFiles?.state?.items?.[i]?.crop}
                          placeholder={`${t("selectCrop")} `}
                          optionValue="id"
                          options={watchedTestFiles.corps?.[i]}
                          optionLabel="name"
                          checkmark={true}
                          highlightOnSelect={false}
                        />
                      </div>
                    )}

                    {watchedFiles?.type == "fertilizer" && (
                      <div className="colm1">
                        <MultiSelect
                          filter
                          id="crop"
                          onScroll={(e) => console.log(e)}
                          className=" mr-2 w-full md:w-full"
                          onChange={(e) => {
                            setValue(`state.items[${i}].crops`, e.value);
                          }}
                          maxSelectedLabels={3}
                          onFilter={debounce((e) => {
                            getCrop(e.filter, i);
                          }, 700)}
                          value={watchedFiles?.state?.items?.[i]?.crops}
                          placeholder={`${t("selectCrop")} `}
                          optionValue="id"
                          options={watchedTestFiles.corps?.[i]}
                          optionLabel="name"
                        />
                      </div>
                    )}

                    {watchedFiles?.type == "drug" && (
                      <div className="colm1 relative">
                        <MultiSelect
                          id="disease"
                          maxSelectedLabels={2}
                          onFilter={debounce((e: any) => {
                            getDiseesesByCrop("", e.filter, i);
                          }, 700)}
                          className=" mr-2 w-full"
                          {...{
                            ...register(`state.items[${i}].diseases`, {
                              required: t("diseaseRequired")
                            }),
                            onChange: function (el) {
                              setValue(`state.items[${i}].diseases`, el.value);
                              clearErrors(`state.items[${i}].diseases`);

                              return el.value;
                            },
                            onBlur: function () {}
                          }}
                          invalid={
                            (errors as any)?.state?.items?.[i]?.diseases
                              ?.message
                              ? true
                              : false
                          }
                          value={watchedFiles?.state?.items?.[i]?.diseases}
                          placeholder={`${t("selectDisease")} `}
                          optionValue="id"
                          options={watchedTestFiles.diseases?.[i]}
                          filter
                          optionLabel="name"
                        />
                        {(errors as any)?.state?.items?.[i]?.diseases
                          ?.message && (
                          <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                            {
                              (errors as any)?.state?.items?.[i]?.diseases
                                ?.message
                            }
                          </p>
                        )}
                      </div>
                    )}

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
                      {(errors as any)?.state?.items?.[i]?.dose_min
                        ?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {
                            (errors as any)?.state?.items?.[i]?.dose_min
                              ?.message
                          }
                        </p>
                      )}
                    </div>

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
                      {(errors as any)?.state?.items?.[i]?.dose_max
                        ?.message && (
                        <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                          {
                            (errors as any)?.state?.items?.[i]?.dose_max
                              ?.message
                          }
                        </p>
                      )}
                    </div>

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
                        // onMouseDown={() => setUnitsSet("")}
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

                    {watchedFiles?.type == "fertilizer" && (
                      <div className="colm1 relative">
                        <InputText
                          className="mr-2 w-full pb-3"
                          id="use_count"
                          type="number"
                          placeholder={`${t("use_count")} `}
                          aria-label="dose_min"
                          {...register(`state.items[${i}].use_count`, {
                            valueAsNumber: true
                          })}
                          invalid={
                            (errors as any)?.state?.items?.[i]?.use_count
                              ?.message
                              ? true
                              : false
                          }
                          value={
                            watchedFiles?.state?.items?.[i]?.use_count || ""
                          }
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
                      </div>
                    )}
                  </div>

                  <div className="w-full rediseaseslative">
                    {watchedFiles?.type == "drug" ? (
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
                    ) : watchedFiles?.type == "fertilizer" ? (
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
                        {(errors as any)?.state?.items?.[i]?.method
                          ?.message && (
                          <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                            {
                              (errors as any)?.state?.items?.[i]?.method
                                ?.message
                            }
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
              setUnitsSet("");
              setIndex(index + 1);
              setIndexArr((state: any) => [index + 1, ...state]);
              clearErrors();
            }}
          />
        </div>
      ) : (
        <ProductItems
          fertilizerItems={fertilizerItems?.data}
          drugItems={drugItems?.data}
          type={watchedFiles?.type}
        />
      )}

      {loader && <Loader />}
    </GlobalFrom>
  );
}
