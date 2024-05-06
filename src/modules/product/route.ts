import ProductAction from "./action";
import ProductPage from "./list";


export const ProductRoute = [
  {
    url: "/product",
    Element: ProductPage,
    label: "Product",
    icon: 'pi pi-palette',
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true,
  },
];

export const ProductActionRoute = [
    {
      url: "/product/:id",
      Element: ProductAction,
      meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    },
  ];
  