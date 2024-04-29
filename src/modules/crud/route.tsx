import CrudPage from "./page/crud";

export const CrudRoute = [
  {
    path: "/crud",
    Element: CrudPage,
    name: "Crud",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: false,
  },
];
