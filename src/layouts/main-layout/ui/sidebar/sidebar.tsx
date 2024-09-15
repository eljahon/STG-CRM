import { NavLink } from "react-router-dom";
import { filteredRoutes } from "../../../../modules";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const Sidebar = () => {
  const { t } = useTranslation();
  const model = [
    ...filteredRoutes.map((role) => {
      return { ...role };
    }),
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sidebar_box border-round-xl">
      {model?.map((item, index) => (
        <div key={index} className="flex flex-column mb-2">
          {item.children.length > 0 ? (
            <div>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={` ${
                  isOpen ? "sidebar_open__links" : "sidebar_close__links"
                }`}
              >
                <div className="flex align-items-center column-gap-2">
                  <i className={item.icon}></i>
                  {t(item.label)}
                </div>
                <span>
                  {isOpen ? (
                    <i className="pi pi-angle-up"></i>
                  ) : (
                    <i className="pi pi-angle-down"></i>
                  )}
                </span>
              </button>

              <div
                className={`content_accordion ${
                  isOpen ? "open_accordion" : "close_accordion"
                }`}
              >
                <div className="sidebar_child__box overflow-hidden">
                  {item.children.map((child, index) => (
                    <NavLink
                      key={index}
                      className="sidebar_child__links"
                      to={child.to}
                    >
                      <i className={child.icon}></i>
                      {t(child.label)}
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <NavLink className="sidebar_links ml-2" to={item.to}>
              <i className={item.icon}></i>
              {item.label}
            </NavLink>
          )}
        </div>
      ))}
    </div>
  );
};
