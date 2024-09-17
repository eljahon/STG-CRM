import React from 'react';
import {BreadCrumb,BreadCrumbProps} from "primereact/breadcrumb";

const  TheBreadcrumb:React.FC<BreadCrumbProps> =(props:BreadCrumbProps) =>  {
    const {model} = props
    const home = { icon: 'pi pi-home', url: '/dashboard' }
    return (
        <div> <BreadCrumb model={model} home={home}/></div>
    );
}

export default TheBreadcrumb;