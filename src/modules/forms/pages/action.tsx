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
import { InputSwitch, InputSwitchChangeEvent } from "primereact/inputswitch";

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
  visible: any;
}
export default function ProductAction() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [page, setPage] = useState<any>(0);
  const pageSize = 5;
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
    ["fertilizerItems", watchedTestFiles.fertilizerId, page],
    () =>
      GetAllData("fertilizations", {
        filters: {
          fertilizer: { id: { $eq: watchedTestFiles.fertilizerId } }
        },
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        }
      }),
    {
      enabled:
        watchedTestFiles?.confirmed && watchedFiles?.type == "fertilizer"
          ? true
          : false
    }
  );

  const { data: drugItems } = useQuery(
    ["drugItems", watchedTestFiles.drugId, page],
    () =>
      GetAllData("treatments", {
        filters: { drug: { id: { $eq: watchedTestFiles.drugId } } },
        populate: "*",
        pagination: {
          page: page / pageSize + 1,
          pageSize: pageSize
        }
      }),
    {
      enabled:
        watchedTestFiles?.confirmed && watchedFiles?.type == "drug"
          ? true
          : false
    }
  );

  const getCrop = async (crop?: string, indexNumber?: any) => {
    setValuetest(`corpsLoading[${indexNumber}]`, true);

    await GetAllData(`crops`, {
      filters: { name: { $containsi: crop || undefined } }
    })
      .then((e) => {
        indexArr?.map((_: any, i: any) => {
          const newArr = watchedTestFiles?.corps?.[i]
            ? [...watchedTestFiles?.corps?.[i], ...e?.data]
            : e?.data;
          const updateArrAdd = watchedTestFiles?.cropsUpdate?.[i]
            ? [...watchedTestFiles?.cropsUpdate?.[i], ...newArr]
            : newArr;
          const uniqueUsersByName: any = lodash.uniqBy(updateArrAdd, "id");
          setValuetest(`corps[${i}]`, uniqueUsersByName);
        });
      })
      .catch((errors) => console.log(errors))
      .finally(() => setValuetest(`corpsLoading[${indexNumber}]`, false));
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
          indexArr?.map((_: any, i: any) => {
            const newArr = watchedTestFiles?.diseases?.[i]
              ? [...watchedTestFiles?.diseases?.[i], ...e?.data]
              : e?.data;
            const updateArrAdd = watchedTestFiles?.diseasesUpdate?.[i]
              ? [...watchedTestFiles?.diseasesUpdate?.[i], ...newArr]
              : newArr;

            const uniqueUsersByName: any = lodash.uniqBy(updateArrAdd, "id");
            setValuetest(`diseases[${i}]`, uniqueUsersByName);
          });
        }
      })
      .catch((errors) => console.log(errors));
  };

  const updataFormat = (items: any) => {
    let returnResult = [...JSON.parse(JSON.stringify(items))];
    console.log(items, "ds");
    for (let i = 0; i < returnResult.length; i++) {
      setIndexArr((state: any) => [i + 1, ...state]);
      if (items?.[i]?.crops) {
        returnResult[i].crops = items?.[i]?.crops?.map((e: any) => e?.id);

        setValuetest(`cropsUpdate[${i}]`, items?.[i]?.crops);
      }
      if (items?.[i]?.diseases) {
        returnResult[i].diseases = items?.[i]?.diseases?.map((e: any) => e?.id);

        setValuetest(`diseasesUpdate[${i}]`, items?.[i]?.diseases);
      }

      if (items?.[i]?.unit) {
        returnResult[i].unit = items?.[i]?.unit.id;
      }
    }
    // console.log(returnResult);

    return returnResult;
  };

  useEffect(() => {
    setValue("type", "drug");
    setValue("visible", true);
  }, []);

  useEffect(() => {
    getDiseesesByCrop("", "", index - 1);
    getCrop("", index - 1);
  }, [index, watchedTestFiles?.diseasesUpdate, watchedTestFiles?.cropsUpdate]);

  useEffect(() => {
    if (id ==="new") {
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
          setValue("visible", e?.data?.visible);
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
            setValue(
              "state.items",
              e?.data?.state?.items?.length
                ? updataFormat(e?.data?.state?.items)
                : []
            );
          }
        })
        .catch((errors) => console.log(errors))
        .finally(() => setLoader(false));
    }
  }, [id]);

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
            <div className="w-full flex gap-4  align-items-center">
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
              <label className="w-full flex gap-4  align-items-center">
                <InputSwitch
                  checked={watchedFiles?.visible}
                  onChange={(e: InputSwitchChangeEvent) =>
                    setValue("visible", e.value)
                  }
                />
                <p className="label-my mb-0">{t("visible")}</p>
              </label>
            </div>
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
              <div className="flex align-items-start gap-3 mb-4 ">
                <div className="w-full">
                  <div className="flex mb-4 gap-2">
                    {watchedFiles?.type == "drug" && (
                      <div className="colm1">
                        <Dropdown
                          filter
                          id="crop"
                          className=" mr-2 w-full md:w-full"
                          onChange={(e) => {
                            console.log(e)
                            getDiseesesByCrop(e.value, "", i, true);
                            if (e.value) {
                              setValuetest(`state.items[${i}].crop`, e.value);
                            }
                          }}
                          onFilter={debounce((e) => {
                            getCrop(e.filter, i);
                          }, 700)}
                          loading={
                            watchedTestFiles.corpsLoading?.[i] ||
                            watchedTestFiles.corpsLoading?.[0]
                          }
                          value={watchedTestFiles?.state?.items?.[i]?.crop}
                          placeholder={`${t("selectCrop")} `}
                          optionValue="id"
                          options={
                            watchedTestFiles.corps?.[i] ||
                            watchedTestFiles.corps?.[0]
                          }
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
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          totalProduct={
            fertilizerItems?.meta?.pagination?.total ||
            drugItems?.meta?.pagination?.total
          }
        />
      )}

      {loader && <Loader />}
    </GlobalFrom>
  );
}
