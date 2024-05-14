import { Outlet, useLocation } from "react-router-dom";
import Header from "./ui/header/index";
import TemplateDemo from "./ui/site-bar/index";

export default function MainLayout() {
  const location = useLocation();
  return (
    <div className="flex gap-5 Container">
      <TemplateDemo />
      <div
        className="w-full relative"
        style={{
          marginLeft: "260px",
          marginTop: ["/product"].includes(location.pathname as any)
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
