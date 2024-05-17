// import { Divider } from 'primereact/divider';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthLogin } from "../../../service/auth";
import Loader from "../../../ui/loader/index";
import { useTranslation } from "react-i18next";

type FormValues = {
  phone: string;
  password: string;
};

export default function LoginFrom() {
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();
  const { t } = useTranslation();
  // const navigate = useNavigate();
  useEffect(() => {
    window.localStorage.removeItem("authToken");
  }, []);
  const handleAuth = async (data: FormValues) => {
    setLoader(true);
    await AuthLogin(data)
      .then((response: any) => {
        window.localStorage.setItem("authToken", response?.data?.token);
        // navigate(`/product`);
        window.location.reload();
        // toast.seccess("login seccess!")
      })
      .catch((error: any) => {
        toast.error(
          error?.response?.data?.error?.message || error?.response?.data
        );
      })
      .finally(() => setLoader(false));
  };
  return (
    <>
      <form
        className="flex justify-content-center align-items-center "
        style={{ height: "90vh" }}
        onSubmit={handleSubmit(handleAuth)}
      >
        <div className="bg-white p-8 pt-6 border-round-xs">
          <div className="w-full flex justify-content-center">
            <img src="/Logo.png" width={150} />
          </div>
          <label className="block my-3">
            <p className="label-my"> {t("phone")}</p>
            <InputText
              //   variant='success'
              id="username"
              type="text"
              placeholder={t("phone")}
              {...register(`phone`, { required: true })}
            />
          </label>
          <label className="block mb-4">
            <p className="label-my">{t("password")}</p>
            <InputText
              //   variant="success"
              id="password"
              type="password"
              placeholder={t("password")}
              {...register(`password`, { required: true })}
            />
          </label>
          <Button label={t("login")} className="w-full"></Button>
        </div>
      </form>
      {loader && <Loader />}
    </>
  );
}
