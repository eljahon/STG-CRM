import { Vehicle } from "./page/vehicle";

export const VehicleRoute = [
  {
    to: "/vehicle",
    Element: Vehicle,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
