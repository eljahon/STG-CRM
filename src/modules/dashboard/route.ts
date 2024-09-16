import { Dashboard } from "./page";
export const DashboardRoute = [
  {
    to: "/dashboard",
    Element: Dashboard,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
