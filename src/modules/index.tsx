import { CampanyActionRoute } from "./campany/route";
import { DashboardRoute } from "./dashboard/route";
import { DistributorsRoute } from "./distributor/route";
import { OrdersRoute } from "./orders/route";
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
  //   ...notFound,
  ...DashboardRoute,
  ...ProductRoute,
  ...SellerProductRoute,
  ...CampanyActionRoute,
  ...ProfileActionRoute,
  ...DistributorsRoute,
  ...SellerRoute,
  // ...BranchRoute,
  ...OrdersRoute
];
const rolename = window.localStorage.getItem("role") || "distributor";

const data = routes.map((el) => {
  return el?.meta?.role?.has(rolename) ? el : null;
});

export const filteredRoutes = data.filter((el) => el !== null);
