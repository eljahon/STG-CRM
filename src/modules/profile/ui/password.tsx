import { useForm } from "react-hook-form";
import GlobalFrom from "../../../ui/form/global-from";
import { Password } from "primereact/password";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface FormData {
  currentPassword: string;
  password: string;
}
export default function ProfilePasswordPage() {
  const { handleSubmit, setValue, reset, watch, setError, clearErrors } =
    useForm<FormData>();
  const [confirPasswordErr, setConfirPaswordErr] = useState<boolean>(false);
  const watchedFiles = watch();
  const { t } = useTranslation();
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"users-permissions/change-password"}
      navUrl={"/profile"}
      title={t("password")}
      cancel={false}
      unfixed={true}
    >
      <div className="w-full bg-white border-round-3xl py-6 px-4 flex gap-5 ">
        <div className="card">
          <p className="label-my">{t("currentpassword")}</p>
          <Password
            toggleMask
            onChange={(e: any) => setValue("currentPassword", e.target.value)}
          />
        </div>
        <div className="card">
          <p className="label-my"> {t("newpassword")}</p>
          <Password
            toggleMask
            onChange={(e: any) => {
              setValue("password", e.target.value);
            }}
          />
        </div>
        <div className="card relative">
          <p className="label-my"> {t("confirmpassword")}</p>
          <Password
            toggleMask
            feedback={false}
            onChange={(e: any) => {
              if (e.target.value == watchedFiles?.password) {
                setConfirPaswordErr(false);
                clearErrors("password");
              } else {
                setConfirPaswordErr(true);
                setError("password", { message: "uncurrect" });
              }
            }}
          />
          {confirPasswordErr ? (
            <p className="absolute bottom-1 left-0 my-0 text-red-600 text-[11px]">
              {t("unCurrectmpassword")}
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </GlobalFrom>
  );
}
