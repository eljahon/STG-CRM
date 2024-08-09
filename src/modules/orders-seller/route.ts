import SellerOrderPage from "./pages";
import SellerOrderAction from "./pages/action";

export const SellerOrderRoute = [
  {
    url: "/order-seller",
    Element: SellerOrderPage,
    label: "orders",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["seller"])
    },
    hideIfchildern: true
  },
  {
    url: "/order-seller/:id",
    Element: SellerOrderAction,
    meta: {
      isLoginIf: false,
      role: new Set(["seller"])
    }
  }
];
