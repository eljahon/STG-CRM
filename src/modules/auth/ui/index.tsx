// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { AuthLogin } from "../../../service/auth";
// import { useTranslation } from "react-i18next";
// import { GetMe } from "../../../service/global";
// import LeftBar from "./left-bar";
//
// type FormValues = {
//   phone: string;
//   password: string;
// };
//
// export default function LoginFrom() {
//   const [loader, setLoader] = useState(false);
//   const { register, handleSubmit } = useForm<FormValues>();
//   const { t } = useTranslation();
//   // const navigate = useNavigate();
//   useEffect(() => {
//     window.localStorage.removeItem("authToken");
//     window.localStorage.removeItem("compony");
//     window.localStorage.removeItem("role");
//   }, []);
//   const handleAuth = async (data: FormValues) => {
//     setLoader(true);
//     await AuthLogin(data)
//       .then((response: any) => {
//         window.localStorage.setItem("authToken", response?.data?.token);
//
//         GetMe().then((res: any) => {
//           window.localStorage.setItem("role", res?.data?.role?.description);
//           window.localStorage.setItem("compony", res?.data?.company?.id);
//           window.localStorage.setItem("fullname", res?.data?.fullname);
//           window.location.reload();
//           // navigate("/dashboard");
//         });
//       })
//       .catch((error: any) => {
//         toast.error(
//           error?.response?.data?.error?.message || error?.response?.data
//         );
//       })
//       .finally(() => setLoader(false));
//   };
//   return (
//     <div
//       className="flex   sm:my-2 sm:mx-4 bg-white border-round-3xl"
//       style={{ boxSizing: "border-box", height: "90vh", overflow: "hidden" }}
//     >
//       <LeftBar />
//       <div className="h-full w-full sm:w-6 flex flex-column  justify-content-center  aling-item-center px-4">
//         <form
//           onSubmit={handleSubmit(handleAuth)}
//           className="w-full m-auto text-center"
//           style={{ maxWidth: "410px" }}
//         >
//           <span className="text-2xl text-green-500 font-bold sm:hidden">
//             GROWZ
//           </span>
//           <h3 className="text-3xl font-bold">Sign In to Woorkroom</h3>
//           <label className="block my-5">
//             <p
//               className="label-my text-left text-base font-bold"
//               style={{ color: "#7D8592" }}
//             >
//               {" "}
//               {t("phone")}
//             </p>
//             <InputText
//               id="username"
//               type="text"
//               className="border-round-2xl w-full"
//               placeholder={t("phone")}
//               {...register(`phone`, { required: true })}
//             />
//           </label>
//           <label className="block mb-5">
//             <p
//               className="label-my text-left text-base font-bold"
//               style={{ color: "#7D8592" }}
//             >
//               {t("password")}
//             </p>
//             <InputText
//               id="password"
//               type="password"
//               className="border-round-2xl w-full "
//               placeholder={t("password")}
//               {...register(`password`, { required: true })}
//             />
//           </label>
//           {/* <div className="w-full text-start mb-5">
//             Don't have account <Link to="/auth/sign-up">sign up</Link>
//           </div> */}
//           <Button
//             loading={loader}
//             severity="success"
//             label={t("login")}
//             className="w-full max-w-10rem border-round-2xl "
//           ></Button>
//         </form>
//       </div>
//     </div>
//   );
// }
import {useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import Logo from '@/assets/logo.svg'
import {useTranslation} from "react-i18next";
const LoginPage = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false);

  // const router = useRouter();
  const containerClassName = classNames('surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden');

  return (
      <div className={containerClassName}>
        <div className="flex flex-column align-items-center justify-content-center">
          {/*<img src={`/layout/images/logo-${layoutConfig.colorScheme === 'light' ? 'dark' : 'white'}.svg`} alt="Sakai logo" className="mb-5 w-6rem flex-shrink-0" />*/}
          <div
              style={{
                borderRadius: '56px',
                padding: '0.3rem',
                background: 'linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)'
              }}
          >
            <div className="w-full surface-card py-8 px-5 sm:px-8" style={{ borderRadius: '53px' }}>
              <div className="text-center mb-5">
                <img src={Logo} alt="Image" height="50" className="mb-3" />
                <div className="text-900 text-3xl font-medium mb-3">Welcome, Isabel!</div>
                <span className="text-600 font-medium">Sign in to continue</span>
              </div>

              <div>
                <label htmlFor="email1" className="block text-900 text-xl font-medium mb-2">
                  {t('login')}
                </label>
                <InputText id="email1" type="text" placeholder="Email address" className="w-full md:w-30rem mb-5" style={{ padding: '1rem' }} />

                <label htmlFor="password1" className="block text-900 font-medium text-xl mb-2">
                  {t('password')}
                </label>
                <Password inputId="password1" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" toggleMask className="w-full mb-5" inputClassName="w-full p-3 md:w-30rem"></Password>

                <div className="flex align-items-center justify-content-between mb-5 gap-5">

                </div>
                <Button label={t('submit')} className="w-full p-3 text-xl"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default LoginPage;

