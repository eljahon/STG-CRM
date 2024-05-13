import { Menu } from "primereact/menu";
import { Link, useLocation } from "react-router-dom";

import { filteredRoutes } from "../../../../modules/index.tsx";
import { Badge } from "primereact/badge";

export default function RouterDemo() {
  const pashName = useLocation();

  const itemRenderer = (item: any) =>
    item.hideIfchildern && (
      <div
        className={`p-menuitem-content border-round-2xl ${
          pashName.pathname.includes(item?.url) ? "bg-green-300 text-white" : ""
        }`}
      >
        <Link
          to={item.url}
          className={`flex align-items-center p-menuitem-link  ${
            pashName.pathname.includes(item?.url) ? " text-white" : ""
          }`}
        >
          <span className={item.icon} />
          <span className="mx-2">{item.label}</span>
          {item.badge && <Badge className="ml-auto" value={item.badge} />}
          {item.shortcut && (
            <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
              {item.shortcut}
            </span>
          )}
        </Link>
      </div>
    );
  const items = [
    {
      template: () => {
        return (
          <span className="inline-flex align-items-center gap-1 px-4 py-4">
            <span className="font-medium text-xl font-semibold">
              <span className="text-green-500">GROWZ</span>
            </span>
          </span>
        );
      }
    },
    // {
    //     label: 'Router Link',
    //     icon: 'pi pi-palette',
    //     url: '/unstyled',
    //     template: itemRenderer
    // },

    ...filteredRoutes.map((el) => ({
      ...el,
      template: (item: any) => itemRenderer(item)
    }))
  ];

  return (
    <div className="w-full max-w-13rem ">
      <Menu
        model={items}
        className="w-full border-round-3xl  border-none px-3"
        style={{ height: "96vh" }}
      />
    </div>
  );
}
