import { useEffect, useState } from "react";
import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";
import { GetMe } from "./service/global";



function App() {
  const [user, setUser] = useState()
  useEffect(() => {
    const fetchData = async () => {
      await GetMe()
        .then((data) => console.log(data))
        .catch((error) => console.log(error))

    }

    fetchData()
  }, [])

  return false ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />;
}

export default App
