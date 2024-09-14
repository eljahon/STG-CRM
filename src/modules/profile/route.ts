import ProfilePage from "./action";

export const ProfileActionRoute = [
  {
    url: "/profile",
    Element: ProfilePage,
    meta: {
      isLoginIf: true,
      role: new Set(["superadmin"])
    }
  }
];
