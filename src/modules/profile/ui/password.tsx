import { useForm } from "react-hook-form";
import GlobalFrom from "../../../ui/form/global-from";
import { Password } from "primereact/password";
import { useState } from "react";

interface FormData {
  currentPassword: string;
  password: string;
}
export default function ProfilePasswordPage() {
  const { handleSubmit, setValue, reset, watch, setError, clearErrors } =
    useForm<FormData>();
  const [confirPasswordErr, setConfirPaswordErr] = useState<boolean>(false);
  const watchedFiles = watch();
  return (
    <GlobalFrom
      handleSubmit={handleSubmit}
      reset={reset}
      url={"users-permissions/change-password"}
      btntext={"Save"}
      navUrl={"/profile"}
      title={`Password`}
      cancel={false}
    >
      <div className="w-full bg-white border-round-3xl py-6 px-4 flex gap-5 ">
        <div className="card">
          <p className="label-my">Current password</p>
          <Password
            toggleMask
            onChange={(e: any) => setValue("currentPassword", e.target.value)}
          />
        </div>
        <div className="card">
          <p className="label-my">New password</p>
          <Password
            toggleMask
            onChange={(e: any) => {
              setValue("password", e.target.value);
            }}
          />
        </div>
        <div className="card relative">
          <p className="label-my"> Confirm password</p>
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
              Confirm password is unCurrect
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    </GlobalFrom>
  );
}
