import { Routes, Route } from "react-router-dom";
import { filteredRoutes } from "../modules/index";
import { Fragment } from "react";
import { authRoute } from "../modules/auth/route";
import MainLayout from "../layouts/main-layout/index";

const nestedRoutes = (routes: any) =>
    routes.map(({ Element, path, children = [] }: any) => {
        if (children?.length) {
            return (
                <Fragment key={path}>
                    <Route key={path} path={path} element={<Element />} />
                    {nestedRoutes(children)}
                </Fragment>
            );
        }
        return <Route key={path} path={path} element={<Element />} />;
    });

export const AuthorizedRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {nestedRoutes(filteredRoutes)}
            </Route>
            {/* <Route path="*" element={<Loading />} /> */}
        </Routes>
    );
};

export const UnAuthorizedRoutes = () => (
    <Routes>
        {/* <Route path="*" element={<Loading />} /> */}
        {authRoute.map(({ Element, path }: any) => (
            <Route key={path} path={path} element={<Element />} />
        ))}
    </Routes>
);
