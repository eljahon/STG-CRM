import { Dashboard } from "./page";
export const DashboardRoute = [
  {
    to: "/dashboard",
    Element: Dashboard,
    icon: "pi pi-th-large",
    children: [],
    label: "Dashboard",
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
