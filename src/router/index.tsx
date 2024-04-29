import {React} from 'react'
import { Routes, Route } from "react-router-dom";
import { filteredRoutes } from "../modules/index";
import { Fragment } from "react";
import { authRoute } from "../modules/auth/route";
import MainLayout from "../layouts/main-layout/index";
interface Imeta  {
     role: Set<string>
}

interface IRouter  {
    url: string;
    Element: any;
    children?: IRouter[],
    meta?: Imeta ,
    hideIfchildern?: boolean
}
const nestedRoutes = (routes: any) =>
    routes.map(({ Element, url, children}: IRouter) => {
        if (children?.length) {
            return (
                <Fragment key={url}>
                    <Route key={url} path={url} element={<Element />} />
                    {nestedRoutes(children)}
                </Fragment>
            );
        }
        return <Route key={url} path={url} element={<Element />} />;
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
        {authRoute.map(({ Element, url }: IRouter) => (
            <Route key={url} path={url} element={<Element />} />
        ))}
    </Routes>
);
