import { classNames } from "primereact/utils";
import { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { AppTopbarRef } from "../type";
import { LayoutContext } from "./context/layoutcontext";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/store.ts";
import { isLogout } from "../store/reducer";
import { useTranslation } from "react-i18next";

import Logo from "../assets/logo.svg";

const AppTopbar = forwardRef<AppTopbarRef>((_, ref) => {
  const { layoutState, onMenuToggle, showProfileSidebar } =
    useContext(LayoutContext);
  const menubuttonRef = useRef(null);
  const topbarmenuRef = useRef(null);
  const topbarmenubuttonRef = useRef(null);
  const navigation = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  useImperativeHandle(ref, () => ({
    menubutton: menubuttonRef.current,
    topbarmenu: topbarmenuRef.current,
    topbarmenubutton: topbarmenubuttonRef.current,
  }));
  const handleLogout = () => {
    dispatch(isLogout());
    navigation("/auth/login");
  };
  return (
    <div className="layout-topbar">
      <Link to="/" className="layout-topbar-logo">
        <img className="w-9rem" src={Logo} alt="Logo" />
      </Link>

      <button
        ref={menubuttonRef}
        type="button"
        className="p-link layout-menu-button layout-topbar-button"
        onClick={onMenuToggle}
      >
        <i className="pi pi-bars" />
      </button>

      <button
        ref={topbarmenubuttonRef}
        type="button"
        className="p-link layout-topbar-menu-button layout-topbar-button"
        onClick={showProfileSidebar}
      >
        <i className="pi pi-ellipsis-v" />
      </button>

      <div
        ref={topbarmenuRef}
        className={classNames("layout-topbar-menu", {
          "layout-topbar-menu-mobile-active":
            layoutState?.profileSidebarVisible,
        })}
      >
        {/*<button type="button" className="p-link layout-topbar-button">*/}
        {/*    <i className="pi pi-calendar"></i>*/}
        {/*    <span>Calendar</span>*/}
        {/*</button>*/}
        {/*<button type="button" className="p-link layout-topbar-button">*/}
        {/*    <i className="pi pi-user"></i>*/}
        {/*    <span>Profile</span>*/}
        {/*</button>*/}
        {/*<button >*/}
        <button
          onClick={handleLogout}
          type="button"
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-sign-out"></i>
          <span>{t("logout")}</span>
        </button>
        {/*</button>*/}
      </div>
    </div>
  );
});

AppTopbar.displayName = "AppTopbar";

export default AppTopbar;
