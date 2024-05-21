import BranchAction from "./page/action";
import BranchList from "./page";

export const BranchRoute = [
  {
    url: "/branch",
    Element: BranchList,
    label: "Branch",
    icon: "pi pi-sitemap",
    children: [],
    meta: { isLoginIf: false, role: new Set(["distributor"]) },
    hideIfchildern: true
  },
  {
    url: "/branch/:id",
    Element: BranchAction,
    meta: { isLoginIf: false, role: new Set(["distributor"]) }
  }
];
