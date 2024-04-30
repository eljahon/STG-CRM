import DashboardPage from "./page/login";

export const DashboardRoute = [
  {
    url: "/dashboard",
    Element: DashboardPage,
    label: "Dashboard",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true,
  },
];
