import { Outlet, useLocation } from "react-router-dom";
import Header from "./ui/header/index";
import RouterDemo from "./ui/site-bar/index";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="flex gap-5 Container">
      <RouterDemo />
      <div
        className="w-full relative"
        style={{
          marginLeft: "260px",
          marginTop: ["/product", "/branch", "/orders", "/dashboard"].includes(
            location.pathname as any
          )
            ? "50px"
            : "190px"
        }}
      >
        <Header />

        <Outlet />
      </div>
    </div>
  );
}
