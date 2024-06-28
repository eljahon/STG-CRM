import DistributorPage from "./pages";

export const DistributorsRoute = [
  {
    url: "/distributor",
    Element: DistributorPage,
    label: "distributors",
    icon: "pi pi-th-large",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["seller"])
    },
    hideIfchildern: true
  },
  {
    url: "/distributors/:id",
    Element: DistributorPage,
    meta: {
      isLoginIf: false,
      role: new Set(["distributor", "branch_distributor"])
    }
  }
];
