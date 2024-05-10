import { CampanyActionRoute } from "./campany/route";
import { ProductActionRoute, ProductRoute } from "./product/route";
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
  // ...DashboardRoute,
  // ...CrudRoute,
  ...ProductRoute,
  ...ProductActionRoute,
  ...CampanyActionRoute
];
const rolename = "SuperAdmin";
export const filteredRoutes = routes.filter(async (el) => {
  return await el?.meta?.role?.has(rolename);
});
