import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthLogin } from "../../../service/auth";
import { useTranslation } from "react-i18next";
import { GetMe } from "../../../service/global";
import { Link } from "react-router-dom";
import LeftBar from "./left-bar";

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
    window.localStorage.removeItem("compony");
    window.localStorage.removeItem("role");
  }, []);
  const handleAuth = async (data: FormValues) => {
    setLoader(true);
    await AuthLogin(data)
      .then((response: any) => {
        window.localStorage.setItem("authToken", response?.data?.token);

        GetMe().then((res: any) => {
          window.localStorage.setItem("role", res?.data?.role?.description);
          window.localStorage.setItem("compony", res?.data?.company?.id);
          window.localStorage.setItem("fullname", res?.data?.fullname);
          window.location.reload();
          // navigate("/dashboard");
        });
      })
      .catch((error: any) => {
        toast.error(
          error?.response?.data?.error?.message || error?.response?.data
        );
      })
      .finally(() => setLoader(false));
  };
  return (
    <div
      className="flex  my-2 mx-4 bg-white border-round-3xl"
      style={{ boxSizing: "border-box", height: "90vh", overflow: "hidden" }}
    >
      <LeftBar />
      <div className="h-full w-6 flex flex-column  justify-content-center  aling-item-center ">
        <form
          onSubmit={handleSubmit(handleAuth)}
          className="w-full m-auto text-center"
          style={{ maxWidth: "410px" }}
        >
          <h3 className="text-3xl font-bold">Sign In to Woorkroom</h3>
          <label className="block my-5">
            <p
              className="label-my text-left text-base font-bold"
              style={{ color: "#7D8592" }}
            >
              {" "}
              {t("phone")}
            </p>
            <InputText
              id="username"
              type="text"
              className="border-round-2xl w-full"
              placeholder={t("phone")}
              {...register(`phone`, { required: true })}
            />
          </label>
          <label className="block mb-5">
            <p
              className="label-my text-left text-base font-bold"
              style={{ color: "#7D8592" }}
            >
              {t("password")}
            </p>
            <InputText
              id="password"
              type="password"
              className="border-round-2xl w-full "
              placeholder={t("password")}
              {...register(`password`, { required: true })}
            />
          </label>
          <div className="w-full text-start mb-5">
            Don't have account <Link to="/auth/sign-up">sign up</Link>
          </div>
          <Button
            loading={loader}
            severity="success"
            label={t("login")}
            className="w-full max-w-10rem border-round-2xl "
          ></Button>
        </form>
      </div>
    </div>
  );
}
