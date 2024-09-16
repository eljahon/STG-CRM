import { Users } from "./page/users";

export const UsersRoute = [
  {
    to: "/users",
    Element: Users,
    children: [],
    meta: {
      isLoginIf: false,
      role: new Set(["superadmin"]),
    },
    hideIfchildern: true,
  },
];
