import DistributorPage from "./pages";

export const DistributorsRoute = [
  {
    url: "/distributor",
    Element: DistributorPage,
    label: "distributors",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    },
    hideIfchildern: true
  },
  {
    url: "/distributors/:id",
    Element: DistributorPage,
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    }
  }
];
