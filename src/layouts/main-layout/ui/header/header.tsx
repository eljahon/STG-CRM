import { Button } from "primereact/button";
import React from "react";

interface Props {
  toggleSideBar: () => void;
}

export const Header: React.FC<Props> = ({ toggleSideBar }) => {
  return (
    <header className="w-full flex align-items-center justify-content-between px-4 py-2">
      <div className="flex ml-2 align-items-center w-22rem justify-content-between">
        <div>
          <h2>SAKAI</h2>
        </div>
        <Button
          onClick={toggleSideBar}
          type="button"
          className="p-link layout-topbar-button"
        >
          <i className="pi pi-bars"></i>
          <span>Burger BUtton</span>
        </Button>
      </div>
      <div className="flex align-items-center column-gap-2">
        <Button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-calendar"></i>
          <span>Calendar</span>
        </Button>
        <Button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-user"></i>
          <span>Profile</span>
        </Button>
        <Button type="button" className="p-link layout-topbar-button">
          <i className="pi pi-cog"></i>
          <span>Calendar</span>
        </Button>
      </div>
    </header>
  );
};
