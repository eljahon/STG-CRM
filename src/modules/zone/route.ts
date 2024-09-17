import { Zone } from "./page/zone.tsx";

export const ZoneRoute = [
  {
    to: "/zone",
    Element: Zone,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
