import CampanySetPage from "./action";




export const CampanyActionRoute = [
    {
      url: "/compony/:id",
      Element: CampanySetPage,
      meta: { isLoginIf: false, role: new Set(["SuperAdmin"]) },
    },
  ];
  