import { useForm } from "react-hook-form";
import GlobalFrom from "../../ui/form/global-from";
// import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useState } from "react";
import UploadFile from "../../ui/uploadFile";
import { GetAllData } from "../../service/global";
import { useQuery } from "react-query";
import { useTranslation } from "react-i18next";
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
    setError,
    clearErrors,
    formState: { errors }
  } = useForm<FormData>();
  const { t } = useTranslation();
  const watchedFiles = watch();
  const [image, setImage] = useState<any>();

  const { data: companies } = useQuery("meFor", () =>
    GetAllData("my-company", { populate: "*" })
  );

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
      cancel={t("cancel")}
      url={
        companies && companies != "undefined" ? "update-company" : "create-company"
      }
      navUrl={"/product"}
      title={t("company")}
    >
      <div className="w-full bg-white border-round-3xl py-6 px-4 flex flex-wrap gap-5 justify-content-between">
        <div className="w-8 ">
          <div className="flex gap-3 w-full mb-5">
            <div className="w-full relative">
              <p className="label-my">{t("companyName")} </p>
              <InputText
                className=" mr-2 w-full"
                id="name"
                placeholder={t("companyName")}
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
            </div>
            <div className="w-full relative">
              <p className="label-my">{t("phone")} </p>
              <InputText
                className=" mr-2 w-full"
                id="phone"
                placeholder={t("phone")}
                aria-label="phone"
                {...register(`phone`, {
                  required: "phone is required",
                  pattern: {
                    value: /^\+998\d{9}$/,
                    message:
                      "Phone number must start with +998 and followed by 9 digits"
                  }
                })}
                invalid={errors?.phone?.message ? true : false}
                value={watchedFiles?.phone || ""}
              />
              {errors?.phone?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.phone?.message}
                </p>
              )}
            </div>
          </div>
          <div className="w-full relative">
            <p className="label-my">{t("description")} </p>
            <InputTextarea
              className=" mr-2 w-full"
              id="description"
              placeholder={t("description")}
              rows={4}
              cols={20}
              {...register(`description`)}
              value={watchedFiles?.description || ""}
              invalid={errors?.description?.message ? true : false}
            />
            {errors?.description?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.description?.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-3 w-3">
          <UploadFile
            setValue={setValue}
            logo={true}
            value={image}
            fieldName={"logo"}
            setError={setError}
            clearErrors={clearErrors}
            error={errors}
          />
        </div>
      </div>
    </GlobalFrom>
  );
}
