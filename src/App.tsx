import { AuthorizedRoutes, UnAuthorizedRoutes } from "./router/index";

function App() {

  return true ? <AuthorizedRoutes /> : <UnAuthorizedRoutes />;
}

export default App
