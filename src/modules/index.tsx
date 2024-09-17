import { FormRoute } from "./form/route";
import { DashboardRoute } from "./dashboard/route";
import { formLayout } from "./formlayout/route.tsx";
import { UsersRoute } from "./users/route.ts";
import {ZoneRoute} from './zone/route.ts'
import {MapsRoute} from './maps/route.ts'

const routes = [
  ...DashboardRoute,
  ...FormRoute,
  ...formLayout,
  ...UsersRoute,
    ...ZoneRoute,
    ...MapsRoute
];
const rolename = localStorage.getItem("role") || "superadmin";

export const filteredRoutes = routes.filter((el) =>
  el?.meta?.role?.has(rolename)
);
