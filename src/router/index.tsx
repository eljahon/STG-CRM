import { Routes, Route } from "react-router-dom";
import { filteredRoutes } from "../modules/index";
import React, {Fragment} from "react";
import { authRoute } from "../modules/auth/route";
import MainLayout from "../layouts/main-layout/index";
interface Imeta  {
     role: Set<string>,
    isLoginIf: boolean
}

interface IRouter  {
    url: string;
    Element:React.FC,
    children?: IRouter[],
    meta?: Imeta ,
    label?:string,
    icon?:string
    hideIfchildern?: boolean
}
const nestedRoutes = (routes: IRouter[]) =>
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
        {authRoute.map(({ Element, url }: IRouter) => (
            <Route key={url} path={url} element={<Element />} />
        ))}
    </Routes>
);
