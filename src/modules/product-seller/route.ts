import SellerProductPage from "./pages";
import SellerProductAction from "./pages/action";

export const SellerProductRoute = [
  {
    url: "/product-seller",
    Element: SellerProductPage,
    label: "products",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"])
    },
    hideIfchildern: true
  },
  {
    url: "/product-seller/:id",
    Element: SellerProductAction,
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    }
  }
];
