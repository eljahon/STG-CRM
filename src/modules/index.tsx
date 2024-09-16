import { FormRoute } from "./form/route";
import { NewsRoute } from "./news/route";
import { DashboardRoute } from "./dashboard/route";
import { formLayout } from "./formlayout/route.tsx";
import { UsersRoute } from "./users/route.ts";

const routes = [
  ...DashboardRoute,
  ...FormRoute,
  ...NewsRoute,
  ...formLayout,
  ...UsersRoute,
];
const rolename = localStorage.getItem("role") || "superadmin";

export const filteredRoutes = routes.filter((el) =>
  el?.meta?.role?.has(rolename)
);
