import { useForm } from "react-hook-form";
import GlobalFrom from "../../../ui/form/global-from";
// import { FloatLabel } from "primereact/floatlabel";
import { InputText } from "primereact/inputtext";
import { useEffect, useState } from "react";
import UploadFile from "../../../ui/uploadFile";
import { GetAllData } from "../../../service/global";
import { useQuery } from "react-query";
import { Dropdown } from "primereact/dropdown";

interface FormData {
  fullname: string;
  gender: number;
  region: number;
  district: number;
  avatar: string | number;
}
export default function ProfileSettingPage() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    clearErrors,
    formState: { errors }
  } = useForm<FormData>();

  const watchedFiles = watch();
  const [image, setImage] = useState<any>();
  const { data: userMe } = useQuery("me", () =>
    GetAllData("users/me", { populate: "*" })
  );
  const { data: genders } = useQuery("genders", () => GetAllData("genders"));
  const { data: regions } = useQuery("regions", () => GetAllData("regions"));

  const { data: districts } = useQuery(
    ["districts", watchedFiles?.region],
    () =>
      GetAllData(
        `districts${
          watchedFiles?.region ? `?filters[region]=${watchedFiles?.region}` : ""
        }`
      )
  );
  useEffect(() => {
    setValue("fullname", userMe?.fullname);
    setValue("gender", userMe?.gender?.id);
    setValue("region", userMe?.region?.id);
    setValue("district", userMe?.district?.id);

    if (userMe?.avatar) {
      setValue("avatar", userMe?.avatar?.id);
      setImage(userMe?.avatar?.aws_path);
    }
  }, [userMe]);
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"users-permissions/user-update"}
      cancel={"Cancel"}
      navUrl={"/product"}
      title={`Profile`}
    >
      <div className="w-full bg-white border-round-3xl py-6 px-4 flex flex-wrap gap-5 justify-content-between mb-4">
        <div className="w-8 ">
          <div className="flex gap-3 w-full mb-5">
            <div className="w-full relative">
              <p className="label-my">Full name</p>
              <InputText
                className=" mr-2 w-full"
                id="name"
                placeholder="full name"
                aria-label="Full name"
                {...register(`fullname`, { required: "fullname is required" })}
                invalid={errors?.fullname?.message ? true : false}
                value={watchedFiles?.fullname || ""}
              />
              {errors?.fullname?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.fullname?.message}
                </p>
              )}
            </div>
            <div className="w-full relative">
              <p className="label-my">Gender</p>
              <Dropdown
                id="gender"
                className=" mr-2 w-full md:w-full"
                {...{
                  ...register("gender", { required: "genders is required" }),
                  onChange: function (el) {
                    setValue("gender", el.value);
                    clearErrors("gender");
                    return el.value;
                  },
                  onBlur: function () {}
                }}
                invalid={errors?.gender?.message ? true : false}
                placeholder={"Select gender"}
                value={watchedFiles?.gender || ""}
                options={genders?.data}
                optionValue="id"
                optionLabel="name"
              />
              {errors?.gender?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.gender?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-3 w-full mb-5">
            <div className="w-full relative">
              <p className="label-my">Region</p>
              <Dropdown
                id="region"
                className=" mr-2 w-full md:w-full"
                {...{
                  ...register("region", { required: "regions is required" }),
                  onChange: function (el) {
                    setValue("region", el.value);
                    clearErrors("region");
                    return el.value;
                  },
                  onBlur: function () {}
                }}
                invalid={errors?.region?.message ? true : false}
                placeholder={"Select region"}
                value={watchedFiles?.region || ""}
                options={regions?.data}
                optionValue="id"
                optionLabel="name"
              />
              {errors?.region?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.region?.message}
                </p>
              )}
            </div>
            <div className="w-full relative">
              <p className="label-my">Districts</p>
              <Dropdown
                id="district"
                className=" mr-2 w-full md:w-full"
                {...{
                  ...register("district", {
                    required: "districts is required"
                  }),
                  onChange: function (el) {
                    setValue("district", el.value);
                    clearErrors("district");
                    return el.value;
                  },
                  onBlur: function () {}
                }}
                invalid={errors?.district?.message ? true : false}
                placeholder={"Select district"}
                value={watchedFiles?.district || ""}
                options={districts?.data}
                optionValue="id"
                optionLabel="name"
              />
              {errors?.district?.message && (
                <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                  {errors?.district?.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-3">
          <UploadFile
            logo={true}
            setValue={setValue}
            value={image}
            fieldName={"avatar"}
          />
        </div>
      </div>
    </GlobalFrom>
  );
}
