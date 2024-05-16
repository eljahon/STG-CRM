import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
import { GetMe } from "./service/global";
import { useLocation, useNavigate } from "react-router-dom";
import GlobalLoader from "./ui/global-loader";
import "../i18";
function App() {
  const [isAuth, setIsAtuh] = useState<any>(
    window.localStorage.getItem("authToken") || null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await GetMe()
        .then((res) => {
          if (
            (res.status == 200 && location.pathname == "/") ||
            location.pathname == "/auth/login"
          ) {
            navigate("/product");
          }
        })
        .catch((error) => {
          if (
            error?.response?.status == "403" ||
            error?.response?.status == "401"
          ) {
            window.localStorage.removeItem("authToken");
            setIsAtuh(null);
          }
        })
        .finally(() => setLoading(false));
    };

    if (!isAuth) {
      navigate("/auth/login");
    }
    fetchData();
  }, []);

  return (
    <>
      {isAuth ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
      {loading ? <GlobalLoader /> : ""}
    </>
  );
}

export default App;
