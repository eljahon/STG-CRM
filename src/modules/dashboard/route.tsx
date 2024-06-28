import DashboardPage from "./pages";

export const DashboardRoute = [
  {
    url: "/dashboard",
    Element: DashboardPage,
    label: "dashboard",
    icon: "pi pi-chart-bar",
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["distributor","seller", "branch_distributor"])
    },
    hideIfchildern: true
  }
];
