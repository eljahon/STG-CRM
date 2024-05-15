import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
import { GetMe } from "./service/global";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "./ui/loader";

function App() {
  const [isAuth, setIsAtuh] = useState<boolean>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const pashName = useLocation();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await GetMe()
        .then((res) => {
          if (res.status == 200) {
            setIsAtuh(true);
          }
        })
        .catch((error) => {
          if (
            error?.response?.status == "403" ||
            error?.response?.status == "401"
          ) {
            navigate("/auth/login");
            window.location.reload();
            window.localStorage.removeItem("authToken");
          }
        })
        .finally(() => setLoading(false));
    };

    if (pashName.pathname != "/auth/login") fetchData();
  }, [pashName]);

  return (
    <>
      {isAuth ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />}
      {loading ? <Loader /> : ""}
    </>
  );
}

export default App;
