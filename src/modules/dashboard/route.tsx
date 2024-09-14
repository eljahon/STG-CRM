import DashboardPage from "./pages";

export const DashboardRoute = [
  {
    url: "/dashboard",
    Element: DashboardPage,
    label: "dashboard",
    icon: "pi pi-chart-bar",
    children: [],
    meta: {
      isLoginIf: true,
      role: new Set(['superadmin'])
    },
    hideIfchildern: true
  }
];
