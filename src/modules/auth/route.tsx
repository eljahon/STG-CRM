import LoginPage from "./page/login";
import SignUpPage from "./page/sign-up";

export const authRoute = [
  {
    to: "/auth/login",
    Element: LoginPage,
    label: "Login",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["admin"]) },
    hideIfchildern: false
  },
  {
    to: "/auth/sign-up",
    Element: SignUpPage,
    label: "SignUp",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["admin"]) },
    hideIfchildern: false
  }
];
