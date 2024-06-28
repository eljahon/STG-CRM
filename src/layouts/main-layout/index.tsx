import { Outlet, useLocation } from "react-router-dom";
import Header from "./ui/header/index";
import RouterDemo from "./ui/site-bar/index";
import { useState } from "react";

export default function MainLayout() {
  const location = useLocation();
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex gap-5 Container">
      <RouterDemo setVisible={setVisible} visible={visible} />
      <div
        className="w-full relative localMreg"
        style={{
          // marginLeft: "260px",
          marginTop: ["/product", "/distributor", "/orders", "/dashboard"].includes(
            location.pathname as any
          )
            ? "50px"
            : "190px"
        }}
      >
        <Header setVisible={setVisible} visible={visible} />

        <Outlet />
      </div>
    </div>
  );
}
