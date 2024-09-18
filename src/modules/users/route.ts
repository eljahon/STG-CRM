import { Users } from "./page/users";
import {UserForms} from "./page/user-forms.tsx";

export const UsersRoute = [
  {
    to: "/employees",
    Element: Users,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
  {
    to: "/employees/:id",
    Element: UserForms,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];