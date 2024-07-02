import SellerPage from "./pages";

export const SellerRoute = [
  {
    url: "/seller",
    Element: SellerPage,
    label: "seller",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["distributor"])
    },
    hideIfchildern: true
  },
  {
    url: "/seller/:id",
    Element: SellerPage,
    meta: {
      isLoginIf: false,
      role: new Set(["distributor"])
    }
  }
];
