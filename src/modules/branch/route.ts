import BranchAction from "./page/action";
import BranchList from "./page";

export const BranchRoute = [
  {
    url: "/branch",
    Element: BranchList,
    label: "branch",
    icon: "pi pi-sitemap",
    children: [],
    meta: { isLoginIf: true, role: new Set(["admin"]) },
    hideIfchildern: true
  },
  {
    url: "/branch/:id",
    Element: BranchAction,
    meta: { isLoginIf: false, role: new Set(["admin"]) }
  }
];
