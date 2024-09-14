import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
import { GetMe } from "./service/global";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalLoader from "./ui/global-loader";
import {useAppSelector} from "./hooks/store.ts";
import "../i18";
function App() {
  const [loading, setLoading] = useState<boolean>(false);
  // const [isAuth, setIsAuth] = useState<boolean>(Boolean(localStorage.getItem("authToken")));
  const navigate = useNavigate();
  const isAuth = useAppSelector((state) => state.Auth.isAuth)
  const location = useLocation();
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     await GetMe()
  //       .then((res: any) => {
  //         window.localStorage.setItem("role", res?.data?.role?.description);
  //         if (res?.data?.company) {
  //           window.localStorage.setItem("compony", res?.data?.company?.id);
  //           window.localStorage.setItem("fullname", res?.data?.fullname);
  //         } else {
  //           window.localStorage.removeItem("compony");
  //         }
  //         if (res.status == "200" && location.pathname == "/")
  //           navigate("/dashboard");
  //       })
  //       .finally(() => setLoading(false));
  //   };
  //   if (location.pathname != "/auth/login" && isAuth) fetchData();
  // }, []);
  //
  useEffect(() => {
    if (!isAuth) {
      navigate("/auth/login");
    } else if (location.pathname == "/" || location.pathname == "/auth/login") {
      navigate("/dashboard");
    }
  }, [isAuth]);

  return (
    <>
      {isAuth ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
      {/*{loading ? <GlobalLoader /> : ""}*/}
    </>
  );
}

export default App;
