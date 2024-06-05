import ProductAction from "./pages/action.tsx";
import ProductPage from "./pages/index.tsx";

export const FormsRoute = [
  {
    url: "/forms",
    Element: ProductPage,
    label: "Forms",
    icon: "pi pi-th-large",
    children: [],
    meta: { isLoginIf: false, role: new Set(["distributor"]) },
    hideIfchildern: true
  },
  {
    url: "/forms/:id",
    Element: ProductAction,
    meta: { isLoginIf: false, role: new Set(["distributor"]) }
  }
];
