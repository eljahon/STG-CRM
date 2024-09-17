import { Maps } from "./page/maps.tsx";

export const MapsRoute = [
  {
    to: "/maps",
    Element: Maps,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
