import ProfilePage from "./action";

export const ProfileActionRoute = [
  {
    url: "/profile",
    Element: ProfilePage,
    meta: {
      isLoginIf: false,
      role: new Set(["distributor", "branch_distributor"])
    }
  }
];
