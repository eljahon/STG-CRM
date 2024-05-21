import OrderPage from "./pages";

export const OrdersRoute = [
  {
    url: "/orders",
    Element: OrderPage,
    label: "Orders",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["distributor", "branch_distributor"])
    },
    hideIfchildern: true
  },
  {
    url: "/orders/:id",
    Element: OrderPage,
    meta: {
      isLoginIf: false,
      role: new Set(["distributor", "branch_distributor"])
    }
  }
];
