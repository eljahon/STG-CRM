import { CampanyActionRoute } from "./campany/route";
import { DashboardRoute } from "./dashboard/route";
import { DistributorsRoute } from "./distributor/route";
import { SellerProductRoute } from "./product-seller/route";
import { ProductRoute } from "./product/route";
import { ProfileActionRoute } from "./profile/route";
import { SellerRoute } from "./seller/route";
const routes = [
  ...DashboardRoute,
  ...ProductRoute,
  ...SellerProductRoute,
  ...CampanyActionRoute,
  ...ProfileActionRoute,
  ...DistributorsRoute,
  ...SellerRoute
];
const rolename = localStorage.getItem("role") || "admin";
export const filteredRoutes = routes.filter((el) => el?.meta?.role?.has(rolename));
