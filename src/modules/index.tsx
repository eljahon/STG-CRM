import { BranchRoute } from "./branch/route";
import { CampanyActionRoute } from "./campany/route";
import { ProductRoute } from "./product/route";
import { ProfileActionRoute } from "./profile/route";

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
  ...ProductRoute,
  ...CampanyActionRoute,
  ...ProfileActionRoute,
  ...BranchRoute
];
const rolename = "SuperAdmin";
export const filteredRoutes = routes.filter(async (el) => {
  return await el?.meta?.role?.has(rolename);
});
