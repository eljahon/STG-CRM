import CampanySetPage from "./action";


export const CampanyActionRoute = [
    {
      url: "/compony/:id",
      Element: CampanySetPage,
      meta: { isLoginIf: true, role: new Set(["admin"]) },
    },
  ];
  