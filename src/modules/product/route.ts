import ProductAction from "./pages/action.tsx";
import ProductPage from "./pages/list.tsx";


export const ProductRoute = [
  {
    url: "/product",
    Element: ProductPage,
    label: "Product",
    icon: 'pi pi-bars',
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true,
  },
  {
    url: "/product/:id",
    Element: ProductAction,
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
  },
];

  