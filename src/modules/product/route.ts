import ProductAction from "./pages/action.tsx";
import ProductPage from "./pages/index.tsx";

export const ProductRoute = [
  {
    url: "/product",
    Element: ProductPage,
    label: "product",
    icon: "pi pi-th-large",
    children: [],
    meta: { isLoginIf: true, role: new Set(["superadmin"]) },
    hideIfchildern: true
  },
  {
    url: "/product/:id",
    Element: ProductAction,
    meta: { isLoginIf: true, role: new Set(["superadmin"]) }
  }
];
