import { useForm } from "react-hook-form";
import GlobalFrom from "../../ui/form/global-from";
import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import { ImageUpload } from "../../utils/uplaoadFile";
import UploadFile from "../../ui/uploadFile";
import { GetAllData } from "../../service/global";
import { useQuery } from "react-query";


export default function CampanySetPage() {
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const watchedFiles = watch();
  const [image, setImage] = useState<any>();

  const { data } = useQuery("meFor", () => GetAllData("users/me",{populate:"*"}));
  const companies = data?.companies?.[0]
  useEffect(()=>{
     setValue("description",companies?.description)
     setValue("name",companies?.name)
     setValue("phone",companies?.phone)
    if(companies?.logo) {
      setValue("logo",companies?.logo)
      // setImage(companies?.logo)
    }
  },[companies])
  return (
      <GlobalFrom
        handleSubmit={handleSubmit}
        reset={reset}
        url={"company"}
        navUrl={'/company/new'}
        title={`Company`}
      >
    <div className="w-full bg-white border-round-3xl py-6 px-4 flex flex-wrap gap-5 justify-content-between">
      <div className="w-8 ">
        <div className="flex gap-3 w-full mb-5">
          <FloatLabel className="w-full relative">
              <InputText
                className=" mr-2 w-full"
                id="name"
                placeholder="name"
                aria-label="name"
                {...register(`name`, { required: "name is required" })}
                invalid={errors?.name?.message?true:false}
                value={watchedFiles?.name || ""}
              />
              { errors?.name?.message &&<p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">{ errors?.name?.message}</p>}
              <label htmlFor="name">Company name</label>
            </FloatLabel>
            <FloatLabel className="w-full relative">
              <InputText
                className=" mr-2 w-full"
                id="phone"
                placeholder="phone"
                aria-label="phone"
                {...register(`phone`, { required: "phone is required" })}
                invalid={errors?.phone?.message?true:false}
                value={watchedFiles?.phone || ""}
              />
              { errors?.phone?.message &&<p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">{ errors?.phone?.message}</p>}
              <label htmlFor="phone">Company phone</label>
            </FloatLabel>
        </div>
        <FloatLabel className="w-full relative">
          <InputTextarea
            className=" mr-2 w-full"
            id="description"
            placeholder="description"
            rows={4}
            cols={20}
            {...register(`description`)}
            value={watchedFiles?.description || ""}
            invalid={errors?.description?.message?true:false}
          />
          <label htmlFor="description">description</label>
          { errors?.description?.message &&<p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">{ errors?.description?.message}</p>}
                 
        </FloatLabel>
      </div>
      <div className="flex gap-3 w-3">
        <UploadFile
         setValue={setValue}
         value={image}
         fieldName={"logo"}
        />
      </div>
      <FloatLabel className="w-full relative">
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
                 
        </FloatLabel>
    </div>
  </GlobalFrom>
  )
}
