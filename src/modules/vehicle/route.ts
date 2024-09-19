import { Vehicle } from "./page/vehicle";
import {VehicleForm} from "./page/vehicle-form.tsx";

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
  {
    to: "/vehicle/form/:id",
    Element: VehicleForm,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
