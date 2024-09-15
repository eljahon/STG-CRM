import { Check } from "./childrens/check";
import { Inputs } from "./childrens/input";
import { Toggle } from "./childrens/toggle/toggle";
import { Form } from "./page";

export const FormRoute = [
  {
    to: "/form",
    Element: Form,
    icon: "pi pi-th-large",
    children: [
      {
        to: "/inputs",
        Element: Inputs,
        label: "Inputs",
        icon: "pi pi-apple",
        meta: {
          isLoginIf: true,
          role: new Set(["superadmin"]),
        },
        hideIfchildern: true,
      },
      {
        to: "/check",
        Element: Check,
        label: "Check",
        icon: "pi pi-bitcoin",
        meta: {
          isLoginIf: true,
          role: new Set(["superadmin"]),
        },
        hideIfchildern: true,
      },
      {
        to: "/toggle",
        Element: Toggle,
        label: "Toggle",
        icon: "pi pi-apple",
        meta: {
          isLoginIf: true,
          role: new Set(["superadmin"]),
        },
        hideIfchildern: true,
      },
    ],
    label: "Form",
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
