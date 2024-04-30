import CrudPage from "./page/crud";

export const CrudRoute = [
  {
    url: "/crud",
    Element: CrudPage,
    label: "Crud",
    icon: 'pi pi-palette',
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true,
  },
];
