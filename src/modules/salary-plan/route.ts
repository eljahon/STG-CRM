import { SalaryPlan } from "./page/salary-plan.tsx";
import {SalaryPlanForms} from "./page/salary-plan-form.tsx";
import { SalaryPlanInfo } from "./page/salary-plan-info.tsx";
import { SalaryPlanInfoForm } from "./page/salar-plan-info-form.tsx";

export const SalaryPlanRoute = [
  {
    to: "/salary-plan",
    Element: SalaryPlan,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
  {
    to: "/salary-plan/form/:id",
    Element: SalaryPlanForms,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
  {
    to: "/salary-plan/info/:id",
    Element: SalaryPlanInfo,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
  {
    to: "/salary-plan/info-form/:id",
    Element: SalaryPlanInfoForm,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
  },
];
