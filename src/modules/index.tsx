
import { CrudRoute } from "./crud/route";
import { DashboardRoute } from "./dashboard/route";
// const notFound = [
//   {
//     path: "*",
//     Element: NotFound,
//     name: "Not Found",
//     meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
//   },
// ];

const routes = [
    //   ...notFound,
    ...DashboardRoute,
    ...CrudRoute
];
const rolename = "SuperAdmin";
export const filteredRoutes = routes.filter(async (el) => {
    return await el?.meta?.role?.has(rolename);
});
