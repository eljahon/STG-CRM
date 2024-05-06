import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
import { GetMe } from "./service/global";
import { useLocation, useNavigate } from "react-router-dom";


function App() {
  const [isAuth, setIsAtuh] = useState<boolean>()
  const navigate = useNavigate()
  const pashName = useLocation()
  useEffect(() => {
    const fetchData = async () => {
      await GetMe()
        .then((res) => {
          if (res.status == '200') {
            setIsAtuh(true)
          }
        })
        .catch((error) => {
          if (error?.response?.status == '403') {
            navigate('/auth/login')
            window.location.reload()
          }
        })
    }

    if (pashName.pathname != '/auth/login')
      fetchData()
  }, [pashName])

  return isAuth ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />;
}

export default App
