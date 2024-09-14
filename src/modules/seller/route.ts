import SellerPage from "./pages";

export const SellerRoute = [
  {
    url: "/seller",
    Element: SellerPage,
    label: "seller",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    },
    hideIfchildern: true
  },
  {
    url: "/seller/:id",
    Element: SellerPage,
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    }
  }
];
