import { Zone } from "./page/zone.tsx";
import {ZoneForms} from "./page/zone-form.tsx";

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
  {
    to: "/zone/form/:id",
    Element: ZoneForms,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
