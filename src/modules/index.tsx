import { FormRoute } from "./form/route";
import { NewsRoute } from "./news/route";
import { DashboardRoute } from "./dashboard/route";

const routes = [...DashboardRoute, ...FormRoute, ...NewsRoute];
const rolename = localStorage.getItem("role") || "superadmin";

export const filteredRoutes = routes.filter((el) =>
  el?.meta?.role?.has(rolename)
);
