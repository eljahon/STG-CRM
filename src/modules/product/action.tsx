import { useEffect, useState } from "react";
import GlobalFrom from "../../ui/form/global-from";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
// import { FloatLabel } from "primereact/floatlabel";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { useQuery } from "react-query";
import { GetAllData, GetByIdData } from "../../service/global";

import UploadFile from "../../ui/uploadFile";
import UploadFileMulty from "../../ui/uploadFileMulty";

const typeArr: any = [
  {
    code: "drug",
    name: "drug"
  },
  {
    code: "fertilizer",
    name: "fertilizer"
  }
];

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
  const [diseases, setdiseases] = useState<any>([]);
  const [cropsSet, setCropsSet] = useState<any>("");
  const [unitsSet, setUnitsSet] = useState<any>("");
  const [index, setIndex] = useState<any>(1);
  const [indexArr, setIndexArr] = useState<any>([]);
  const [image, setImage] = useState<any>();
  const [imageMulti, setImageMulti] = useState<any>([]);
  const [imageSer, setImageSer] = useState<any>();

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const watchedFiles = watch();
  const { data: crops } = useQuery(["crops", cropsSet], () =>
    GetAllData(`crops${cropsSet && `?filters[name][$contains]=${cropsSet}`}`)
  );
  const { data: units } = useQuery(["units", unitsSet], () =>
    GetAllData(`units${unitsSet && `?filters[name][$contains]=${unitsSet}`}`)
  );
  const { data: drugCategory } = useQuery("drugCategory", () =>
    GetAllData("drug-categories")
  );
  const { data: fertilizerCategory } = useQuery("fertilizerCategory", () =>
    GetAllData("fertilizer-categories")
  );
  const getDiseesesByCrop = async (crop: string) => {
    await GetAllData(`diseases${crop && `?filters[crop]=${crop}`}`)
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
              if (e?.data?.state?.items?.[i]?.crop)
                setValue(
                  `state.items[${i}].crop`,
                  e?.data?.state?.items?.[i]?.crop?.id
                );
              if (e?.data?.state?.items?.[i]?.description)
                setValue(
                  `state.items[${i}].description`,
                  e?.data?.state?.items?.[i]?.description
                );
              if (e?.data?.state?.items?.[i]?.disease)
                setValue(
                  `state.items[${i}].disease`,
                  e?.data?.state?.items?.[i]?.disease?.id
                );
              if (e?.data?.state?.items?.[i]?.dose_max)
                setValue(
                  `state.items[${i}].dose_max`,
                  e?.data?.state?.items?.[i]?.dose_max
                );
              if (e?.data?.state?.items?.[i]?.dose_min)
                setValue(
                  `state.items[${i}].dose_min`,
                  e?.data?.state?.items?.[i]?.dose_min
                );
              if (e?.data?.state?.items?.[i]?.unit)
                setValue(
                  `state.items[${i}].unit`,
                  e?.data?.state?.items?.[i]?.unit?.id
                );
              if (e?.data?.state?.items?.[i]?.use_count)
                setValue(
                  `state.items[${i}].use_count`,
                  e?.data?.state?.items?.[i]?.use_count
                );
              if (e?.data?.state?.items?.[i]?.method)
                setValue(
                  `state.items[${i}].method`,
                  e?.data?.state?.items?.[i]?.method
                );
            });
        })
        .catch((errors) => console.log(errors));
    }
  }, [id]);
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"products"}
      navUrl={"/product"}
      title={`Product ${id == "new" ? "Add" : "Update"}`}
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
                  placeholder="title"
                  aria-label="title"
                  {...register(`title`, { required: "title is required" })}
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
                  placeholder="price"
                  {...register(`price`, {
                    required: "price is required",
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
                  optionValue="name"
                  value={watchedFiles?.state?.type}
                  placeholder={"Select Type"}
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
                    ...register("unit", { required: "unit is required" }),
                    onChange: function (el) {
                      setValue("unit", el.value);
                      clearErrors("unit");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  onFilter={(e) => console.log(e?.filter)}
                  invalid={errors?.unit?.message ? true : false}
                  placeholder={"Select Units"}
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
                      required: "drug_category is required"
                    }),
                    onChange: function (el) {
                      setValue("drug_category", el.value);
                      clearErrors("drug_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={errors?.drug_category?.message ? true : false}
                  placeholder={"Select drugs category"}
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
                      required: "fertilizer_category is required"
                    }),
                    onChange: function (el) {
                      setValue("fertilizer_category", el.value);
                      clearErrors("fertilizer_category");
                      return el.value;
                    },
                    onBlur: function () {}
                  }}
                  invalid={errors?.fertilizer_category?.message ? true : false}
                  placeholder={"Select fertilizer category"}
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
                placeholder="description"
                rows={7}
                cols={20}
                {...register(`description`, {
                  required: "description is required"
                })}
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
            fieldName={"image"}
          />
          <UploadFile setValue={setValue} fieldName={"cer"} value={imageSer} />
        </div>
      </div>

      <div className="p-4 bg-white border-round-3xl mt-4">
        {indexArr?.map((_: any, i: any) => (
          <div key={i} className="flex align-items-center gap-6 mb-4">
            <div className="w-10">
              <div className="flex mb-4 gap-2">
                {/* floatLabel */}
                <div className="w-full">
                  <Dropdown
                    filter
                    id="crop"
                    className=" mr-2 w-full md:w-full"
                    onChange={(e) => {
                      if (watchedFiles?.state?.type == "fertilizer")
                        setValue(`state.items[${i}].crop`, e.value);
                      getDiseesesByCrop(e.value);
                    }}
                    onFilter={(e) => setCropsSet(e.filter)}
                    value={watchedFiles?.state?.items?.[i]?.crop}
                    placeholder={"Select Crops"}
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
                  <div className="w-full relative">
                    <Dropdown
                      filter
                      id="disease"
                      className=" mr-2 w-full"
                      {...{
                        ...register(`state.items[${i}].disease`, {
                          required: "disease is required"
                        }),
                        onChange: function (el) {
                          setValue(`state.items[${i}].disease`, el.value);
                          clearErrors(`state.items[${i}].disease`);
                          return el.value;
                        },
                        onBlur: function () {}
                      }}
                      invalid={
                        (errors as any)?.state?.items?.[i]?.disease?.message
                          ? true
                          : false
                      }
                      value={watchedFiles?.state?.items?.[i]?.disease}
                      placeholder={"Select Diseases"}
                      optionValue="id"
                      options={diseases}
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
                <div className="w-full relative">
                  <InputText
                    type="number"
                    className="mr-2 w-full pb-3"
                    id="dose_max"
                    placeholder="dose_max"
                    {...register(`state.items[${i}].dose_max`, {
                      required: "dose_max is required",
                      valueAsNumber: true
                    })}
                    value={watchedFiles?.state?.items?.[i]?.dose_max || ""}
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
                <div className="w-full relative">
                  <InputText
                    className="mr-2 w-full pb-3"
                    id="dose_min"
                    type="number"
                    placeholder="dose_min"
                    aria-label="dose_min"
                    {...register(`state.items[${i}].dose_min`, {
                      required: "dose_min is required",
                      valueAsNumber: true
                    })}
                    invalid={
                      (errors as any)?.state?.items?.[i]?.dose_min?.message
                        ? true
                        : false
                    }
                    value={watchedFiles?.state?.items?.[i]?.dose_min || ""}
                  />
                  {(errors as any)?.state?.items?.[i]?.dose_min?.message && (
                    <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                      {(errors as any)?.state?.items?.[i]?.dose_min?.message}
                    </p>
                  )}
                  {/* <label htmlFor="dose_min">dose_min</label> */}
                </div>

                {/* floatLabel */}
                <div className="w-full relative">
                  <Dropdown
                    filter
                    id="unit"
                    className=" mr-2 w-full"
                    {...{
                      ...register(`state.items[${i}].unit`, {
                        required: "unit is required"
                      }),
                      onChange: function (el) {
                        setValue(`state.items[${i}].unit`, el.value);
                        clearErrors(`state.items[${i}].unit`);
                        return el.value;
                      },
                      onBlur: function () {}
                    }}
                    invalid={
                      (errors as any)?.state?.items?.[i]?.unit?.message ? true : false
                    }
                    value={watchedFiles?.state?.items?.[i]?.unit}
                    placeholder={"Select Units"}
                    optionValue="id"
                    options={units?.data}
                    optionLabel="name"
                    checkmark={true}
                    onFilter={(e) => setUnitsSet(e.filter)}
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
                  <div className="w-full relative">
                    <InputText
                      className="mr-2 w-full pb-3"
                      id="use_count"
                      type="number"
                      placeholder="use_count"
                      aria-label="dose_min"
                      {...register(`state.items[${i}].use_count`, {
                        required: "use_count is required",
                        valueAsNumber: true
                      })}
                      invalid={
                        (errors as any)?.state?.items?.[i]?.use_count?.message
                          ? true
                          : false
                      }
                      value={watchedFiles?.state?.items?.[i]?.use_count || ""}
                    />
                    {(errors as any)?.state?.items?.[i]?.use_count?.message && (
                      <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                        {(errors as any)?.state?.items?.[i]?.use_count?.message}
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
                      placeholder="description"
                      rows={4}
                      cols={20}
                      {...register(`state.items[${i}].description`)}
                      value={watchedFiles?.state?.items?.[i]?.description}
                      invalid={
                        (errors as any)?.state?.items?.[i]?.description?.message
                          ? true
                          : false
                      }
                    />
                    {/* <label htmlFor="descriptionitems">description</label> */}
                    {(errors as any)?.state?.items?.[i]?.description?.message && (
                      <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                        {(errors as any)?.state?.items?.[i]?.description?.message}
                      </p>
                    )}
                  </>
                ) : watchedFiles?.state?.type == "fertilizer" ? (
                  <>
                    <InputTextarea
                      className=" mr-2 w-full"
                      id="method"
                      placeholder="method"
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
              className="w-2 max-w-10rem border-round-3xl"
              label="Delete"
              type="button"
              severity="danger"
              icon="pi pi-trash"
              onClick={() => {
                // setValue('price', watchedFiles.price?.filter((al,index) => index !== i))
                // setValue(`state.items`,watchedFiles?.state?.items?.filter((al,index) => index !== i))
                setIndexArr((state: any) =>
                  state.length > 1 ? state?.slice(0, -1) : state
                );
              }}
            />
          </div>
        ))}

        <Button
          label="Add"
          type="button"
          severity="success"
          className="border-round-3xl px-5"
          onClick={() => {
            setIndex(index + 1);
            setIndexArr((state: any) => [index + 1, ...state]);
          }}
        />
      </div>
    </GlobalFrom>
  );
}
