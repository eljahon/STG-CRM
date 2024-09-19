
import AppMenuitem from "./AppMenuitem";
import { MenuProvider } from "./context/menucontext";
import { AppMenuItem } from "../type";


const AppMenu = () => {
  const model: AppMenuItem[] = [
    {
      items: [
        { label: "dashboard", icon: "pi pi-fw pi-chart-line", to: "/dashboard", name: 'dashboard' },
        { label: "zone", icon: "pi pi-fw pi-map-marker", to: "/zone", name: 'zone' },
        { label: "maps", icon: "pi pi-fw  pi-map", to: "/maps" , name: 'maps'},
        { label: "employees", icon: "pi pi-fw pi-users", to: "/employees", name: 'employees' },
        { label: "cars", icon: "pi pi-fw  pi-car", to: "/vehicle", name: 'vehicle' },
        { label: "salary_plan", icon: "pi pi-fw  pi-calendar", to: "/cars", name:'salaryPlan' },
        { label: "notifcations", icon: "pi pi-fw  pi-bell", to: "/notifcations" , name: 'notifcations'},
      ],
    },
    {
      items: [
        {
          label: "warehouse",
          icon: "pi pi-fw pi-home",
          items: [
            {
              label: "login",
              icon: "pi pi-fw pi-sign-in",
              to: "/auth/login",
            },
            {
              label: "error",
              icon: "pi pi-fw pi-times-circle",
              to: "/auth/error",
            },
            {
              label: "access-denied",
              icon: "pi pi-fw pi-lock",
              to: "/auth/access",
            },
          ],
        }
      ],
    },
    {
      items: [
        {
          label: "repair",
          icon: "pi pi-fw pi-cog",
          items: [
            {
              label: "Login",
              icon: "pi pi-fw pi-sign-in",
              to: "/auth/login",
            },
            {
              label: "error",
              icon: "pi pi-fw pi-times-circle",
              to: "/auth/error",
            },
            {
              label: "access-denied",
              icon: "pi pi-fw pi-lock",
              to: "/auth/access",
            },
          ],
        },
      ],
    },
  ];

  return (
    <MenuProvider>
      <ul className="layout-menu">
        {model.map((item, i) => {
          return !item?.seperator ? (
            <AppMenuitem item={item} root={true} index={i} key={i} />
          ) : (
            <li className="menu-separator" key={i}></li>
          );
        })}
      </ul>
    </MenuProvider>
  );
};

export default AppMenu;
