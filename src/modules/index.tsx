import { FormRoute } from "./form/route";
import { NewsRoute } from "./news/route";
import { DashboardRoute } from "./dashboard/route";
import {formLayout} from "./formlayout/route.tsx";

const routes = [...DashboardRoute, ...FormRoute, ...NewsRoute, ...formLayout];
const rolename = localStorage.getItem("role") || "superadmin";

export const filteredRoutes = routes.filter((el) =>
  el?.meta?.role?.has(rolename)
);
