
import React from 'react';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Link, useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

import { filteredRoutes } from '../../../../modules/index.tsx'

export default function RouterDemo() {
    const navigate = useNavigate()

    const itemRenderer = (item) => (
        item.hideIfchildern && <div className='p-menuitem-content '>
            <Link to={item.url} className="flex align-items-center p-menuitem-link">
                <span className={item.icon} />
                <span className="mx-2">{item.label}</span>
                {item.badge && <Badge className="ml-auto" value={item.badge} />}
                {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
            </Link>
        </div>
    );
    const items = [
        {
            template: () => {
                return (
                    <span className="inline-flex align-items-center gap-1 px-4 py-4">
                        <span className="font-medium text-xl font-semibold">
                            <span className="text-primary">GROWZ</span>
                        </span>
                    </span>
                );
            }
        },
        // {
        //     label: 'Router Link',
        //     icon: 'pi pi-palette',
        //     url: '/unstyled',
        //     template: itemRenderer
        // },
   
        ...filteredRoutes.map(el => (
            {
                ...el,
                template: (item) => itemRenderer(item)
            }
        )),
        {
            template: () => {
                return (
                   <div className='mt-auto mx-4 cursor-pointer'  onClick={()=>{
                        window.localStorage.clear('authToken')
                        window.location.reload();
                     }}>
                      <span className='pi pi-sign-out'/>
                       <span className='ml-1 '> Log out</span> 
                    </div>
                );
            }
        },
    ];

    return (
        <div className='w-full max-w-15rem '>
            <Menu model={items} className='w-full' style={{ "height": '96vh' }} />
        </div>
    )
}


