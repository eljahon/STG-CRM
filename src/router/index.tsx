import { Routes, Route } from "react-router-dom";
import { filteredRoutes } from "../modules/index";
import React, { Fragment } from "react";
import { authRoute } from "../modules/auth/route";
// import MainLayout from "../layout/main-layout/index";
import Layout from "../layout/layout.tsx";
interface Imeta {
  role: Set<string>;
  isLoginIf: boolean;
}

interface IRouter {
  to: string;
  Element: React.FC;
  children?: IRouter[];
  meta?: Imeta;
  label?: string;
  icon?: string;
  hideIfchildern?: boolean;
}

const nestedRoutes = (routes: IRouter[]) =>
  routes.map(({ Element, to, children }: IRouter) => {
    if (children?.length) {
      return (
        <Fragment key={to}>
          <Route key={to} path={to} element={<Element />} />
          {nestedRoutes(children)}
        </Fragment>
      );
    }
    return <Route key={to} path={to} element={<Element />} />;
  });

export const AuthorizedRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {nestedRoutes(filteredRoutes)}
      </Route>
      {/* <Route path="*" element={<Loading />} /> */}
    </Routes>
  );
};0

export const UnAuthorizedRoutes = () => (
  <Routes>
    {authRoute.map(({ Element, to }: IRouter) => (
      <Route key={to} path={to} element={<Element />} />
    ))}
  </Routes>
);
