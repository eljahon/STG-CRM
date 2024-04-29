import DashboardPage from "./page/login";

export const DashboardRoute = [
  {
    path: "/dashboard",
    Element: DashboardPage,
    name: "Dashboard",
    icon: "",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: false,
  },
];
