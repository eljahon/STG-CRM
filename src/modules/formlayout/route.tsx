import FormLayout from "./page.tsx";

export const formLayout = [
  {
    to: "/form-layout",
    Element: FormLayout,
    label: "Login",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["superadmin"]) },
    hideIfchildern: false
  }
];
