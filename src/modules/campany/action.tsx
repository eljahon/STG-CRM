import { useForm } from "react-hook-form";
import GlobalFrom from "../../ui/form/global-from";
// import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import UploadFile from "../../ui/uploadFile";
import { GetAllData } from "../../service/global";
import { useQuery } from "react-query";
interface FormData {
  description: string;
  name: string;
  phone: string;
  logo: string | number;
}
export default function CampanySetPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormData>();

  const watchedFiles = watch();
  const [image, setImage] = useState<any>();
  const company = window.localStorage.getItem("company");
  const { data: companies } = useQuery("meFor", () =>
    GetAllData("my-company", { populate: "*" })
  );
  console.log(companies);
  useEffect(() => {
    setValue("description", companies?.description);
    setValue("name", companies?.name);
    setValue("phone", companies?.phone);
    if (companies?.logo) {
      setValue("logo", companies?.logo?.id);
      setImage(companies?.logo?.aws_path);
    }
  }, [companies]);
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={
        company && company != "undefined" ? "update-company" : "create-company"
      }
      navUrl={"/compony/old"}
      title={`Company`}
    >
      <div className="w-full bg-white border-round-3xl py-6 px-4 flex flex-wrap gap-5 justify-content-between">
        <div className="w-8 ">
          <div className="flex gap-3 w-full mb-5">
            {/* FloatLabel */}
            <div className="w-full relative">
              <InputText
                className=" mr-2 w-full"
                id="name"
                placeholder="name"
                aria-label="name"
                {...register(`name`, { required: "name is required" })}
                invalid={errors?.name?.message ? true : false}
                value={watchedFiles?.name || ""}
              />
              {errors?.name?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.name?.message}
                </p>
              )}
              {/* <label htmlFor="name">Company name</label> */}
            </div>
            {/* FloatLabel */}
            <div className="w-full relative">
              <InputText
                className=" mr-2 w-full"
                id="phone"
                placeholder="phone"
                aria-label="phone"
                {...register(`phone`, { required: "phone is required" })}
                invalid={errors?.phone?.message ? true : false}
                value={watchedFiles?.phone || ""}
              />
              {errors?.phone?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.phone?.message}
                </p>
              )}
              {/* <label htmlFor="phone">Company phone</label> */}
            </div>
          </div>
          {/* FloatLabel */}
          <div className="w-full relative">
            <InputTextarea
              className=" mr-2 w-full"
              id="description"
              placeholder="description"
              rows={4}
              cols={20}
              {...register(`description`)}
              value={watchedFiles?.description || ""}
              invalid={errors?.description?.message ? true : false}
            />
            {/* <label htmlFor="description">description</label> */}
            {errors?.description?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.description?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 w-3">
          <UploadFile setValue={setValue} value={image} fieldName={"logo"} />
        </div>
        {/* FloatLabel{/*  */}
        {/* <div className="w-full relative">
          <InputTextarea
            className=" mr-2 w-full"
            id="about"
            placeholder="about"
            rows={4}
            cols={20}
            {...register(`about`)}
            value={watchedFiles?.about || ""}
            invalid={errors?.about?.message?true:false}
          />
          <label htmlFor="about">about</label>
          { errors?.about?.message &&<p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">{ errors?.about?.message}</p>}
                 
        </div>  */}
      </div>
    </GlobalFrom>
  );
}
