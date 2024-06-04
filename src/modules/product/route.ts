import ProductAction from "./pages/action.tsx";
import ProductPage from "./pages/index.tsx";

export const ProductRoute = [
  {
    url: "/product",
    Element: ProductPage,
    label: "product",
    icon: "pi pi-th-large",
    children: [],
    meta: { isLoginIf: false, role: new Set(["distributor"]) },
    hideIfchildern: true
  },
  {
    url: "/product/:id",
    Element: ProductAction,
    meta: { isLoginIf: false, role: new Set(["distributor"]) }
  }
];
