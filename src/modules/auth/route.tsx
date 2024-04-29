import LoginPage from "./page/login";

export const authRoute = [
  {
    url: "/auth/login",
    Element: LoginPage,
    label: "Login",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: false,
  },

];
