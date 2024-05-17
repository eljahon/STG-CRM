import BranchAction from "./page/action";
import BranchList from "./page/list";

export const BranchRoute = [
  {
    url: "/branch",
    Element: BranchList,
    label: "Branch",
    icon: "pi pi-bars",
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true
  },
  {
    url: "/branch/:id",
    Element: BranchAction,
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) }
  }
];
