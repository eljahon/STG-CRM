import { News } from "./page";

export const NewsRoute = [
  {
    to: "/news",
    Element: News,
    icon: "pi pi-th-large",
    children: [],
    label: "News",
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
