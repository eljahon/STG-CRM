import { Outlet } from "react-router-dom";
import { Sidebar } from "./ui/sidebar/sidebar";
import { useState } from "react";
import { Header } from "./ui/header";

export default function MainLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const toggleSidebarBtn = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <Header toggleSideBar={toggleSidebarBtn} />
      <div className="layout_main">
        {isSidebarVisible && (
          <div
            className={`sidebar layout-sidebar ${
              isSidebarVisible ? "" : "hidden_sidebar"
            }`}
          >
            <Sidebar />
          </div>
        )}

        <div
          className={`content bg-white border-round-xl ${
            isSidebarVisible ? "with_sidebar" : "full_width"
          }`}
        >
          <Outlet />
        </div>
      </div>
    </div>
  );
}
