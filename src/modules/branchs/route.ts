import ProductAction from "./pages/create.tsx";
import ProductPage from "./pages";


export const BranchRoute = [
  {
    url: "/branch",
    Element: ProductPage,
    label: "Branchs",
    icon: 'pi pi-bars',
    children: [],
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    hideIfchildern: true,
  },
  {
    url: "/branch/:id",
    Element: ProductAction,
    meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
  },
];

  