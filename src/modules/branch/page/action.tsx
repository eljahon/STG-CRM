import { useForm } from "react-hook-form";
import GlobalFrom from "../../../ui/form/global-from";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { InputText } from "primereact/inputtext";
import { useQuery } from "react-query";
import { GetAllData } from "../../../service/global";
import { Dropdown } from "primereact/dropdown";
import YandexMap from "../../../ui/yandex-map";

interface ILocation {
  lat: number | undefined;
  long: number | undefined;
}
interface FormData {
  fullName: string | undefined;
  password: string | undefined;
  branchName: string | undefined;
  phone: string | undefined;
  location: ILocation | any;
  region: number | undefined;
  district: number | undefined;
}

const BranchAction = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    watch,
    formState: { errors }
  } = useForm<FormData>();
  const { id } = useParams();
  const watchedFiles = watch();

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
  const handleLocationSelect = (coords: number[]) => {
    setValue("location.lat", coords?.[0]);
    setValue("location.long", coords?.[1]);
  };
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"company-branches"}
      navUrl={"/branch"}
      cancel={t("cancel")}
      title={`${t("branch")} ${id == "new" ? t("add") : t("update")}`}
    >
      <div className="flex gap-4 ">
        <div className="w-8 bg-white border-round-3xl p-4 ">
          <h3>Branch</h3>
          <div className="w-full relative mb-4">
            <p className="label-my">{t("branchName")}</p>
            <InputText
              className=" mr-2 w-full"
              id="branchName"
              placeholder={t("branchName")}
              aria-label="branchName"
              {...register(`branchName`, { required: t("branchNamerequired") })}
              invalid={errors?.branchName?.message ? true : false}
              value={watchedFiles?.branchName || ""}
            />
            {errors?.branchName?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.branchName?.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 relative mb-4">
            <div className="w-full relative">
              <p className="label-my">{t("selectregion")} </p>
              <Dropdown
                id="region"
                className=" mr-2 w-full md:w-full"
                {...{
                  ...register("region", { required: t("requiredregion") }),
                  onChange: function (el) {
                    setValue("region", el.value);
                    clearErrors("region");
                    return el.value;
                  },
                  onBlur: function () {}
                }}
                invalid={errors?.region?.message ? true : false}
                placeholder={t("region")}
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

          <YandexMap
            onLocationSelect={handleLocationSelect}
            value={
              watchedFiles.location
                ? [watchedFiles.location.lat, watchedFiles.location.long]
                : null
            }
          />
        </div>
        <div className="w-4 bg-white border-round-3xl p-4">
          <h3>Owner</h3>
          <div className="w-full relative mb-4">
            <p className="label-my">{t("fullName")}</p>
            <InputText
              className=" mr-2 w-full"
              id="fullName"
              placeholder={t("fullName")}
              aria-label="fullName"
              {...register(`fullName`, { required: t("fullNamerequired") })}
              invalid={errors?.fullName?.message ? true : false}
              value={watchedFiles?.fullName || ""}
            />
            {errors?.fullName?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.fullName?.message}
              </p>
            )}
          </div>
          <div className="w-full relative mb-4">
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
          <div className="w-full relative mb-4">
            <p className="label-my">{t("password")}</p>
            <InputText
              className=" mr-2 w-full"
              id="password"
              placeholder={t("password")}
              aria-label="password"
              {...register(`password`, { required: t("passwordrequired") })}
              invalid={errors?.password?.message ? true : false}
              value={watchedFiles?.password || ""}
            />
            {errors?.password?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div className="w-full relative mb-4">
            <p className="label-my">{t("confirmpassword")}</p>
            <InputText
              className=" mr-2 w-full"
              id="confirmpassword"
              placeholder={t("confirmpassword")}
              aria-label="confirmpassword"
              invalid={errors?.password?.message ? true : false}
            />
            {errors?.password?.message && (
              <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
                {errors?.password?.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </GlobalFrom>
  );
};

export default BranchAction;
