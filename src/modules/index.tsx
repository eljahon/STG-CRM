import { CampanyActionRoute } from "./campany/route";
import { DashboardRoute } from "./dashboard/route";
import { DistributorsRoute } from "./distributor/route";
import { SellerOrderRoute } from "./orders-seller/route";
import { SellerProductRoute } from "./product-seller/route";
import { ProductRoute } from "./product/route";
import { ProfileActionRoute } from "./profile/route";
import { SellerRoute } from "./seller/route";

// const notFound = [
//   {
//     path: "*",
//     Element: NotFound,
//     name: "Not Found",
//     meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
//   },
// ];

const routes = [
  ...DashboardRoute,
  ...ProductRoute,
  ...SellerProductRoute,
  ...CampanyActionRoute,
  ...ProfileActionRoute,
  ...SellerOrderRoute,
  ...DistributorsRoute,
  ...SellerRoute
  // ...BranchRoute,
  // ...OrdersRoute
];
const rolename = window.localStorage.getItem("role") || "distributor";
export const filteredRoutes = routes.filter((el) => el?.meta?.role?.has(rolename));
