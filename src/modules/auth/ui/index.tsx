// import { Divider } from 'primereact/divider';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthLogin } from "../../../service/auth";
import Loader from "../../../ui/loader/index";

type FormValues = {
  phone: string;
  password: string;
};

export default function LoginFrom() {
  const [loader, setLoader] = useState(false);
  const { register, handleSubmit } = useForm<FormValues>();

  const navigate = useNavigate();

  const handleAuth = async (data: FormValues) => {
    setLoader(true);
    await AuthLogin(data)
      .then((response: any) => {
        window.localStorage.setItem("authToken", response?.data?.token);
        navigate(`/product`);
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
          <label className="block">
            <p>Username </p>
            <InputText
              //   variant='success'
              id="username"
              type="text"
              {...register(`phone`, { required: true })}
            />
          </label>
          <label className="block mb-4">
            <p>Password</p>
            <InputText
              //   variant="success"
              id="password"
              type="password"
              {...register(`password`, { required: true })}
            />
          </label>
          <Button label="Login" className="w-full"></Button>
        </div>
      </form>
      {loader && <Loader />}
    </>
  );
}
