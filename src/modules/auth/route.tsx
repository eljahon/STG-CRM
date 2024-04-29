import LoginPage from "./page/login";

export const authRoute = [
  {
    path: "/auth/login",
    Element: LoginPage,
    name: "Login",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: false,
  },

];
