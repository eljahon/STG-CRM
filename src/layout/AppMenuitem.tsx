
import { Ripple } from 'primereact/ripple';
import { classNames } from 'primereact/utils';
import React, {useEffect, useContext, useRef} from 'react';
import { CSSTransition } from 'react-transition-group';
import { MenuContext } from './context/menucontext';
import { AppMenuItemProps } from '../type';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import {useTranslation} from "react-i18next";
const AppMenuitem = (props: AppMenuItemProps) => {
    const {pathname} = useLocation();
    const {t} = useTranslation()
    const nodeRef = useRef<HTMLUListElement>(null)
    const searchParams = useSearchParams();
    const { activeMenu, setActiveMenu } = useContext(MenuContext);
    const item = props.item;
    const key = props.parentKey ? props.parentKey + '-' + props.index : String(props.index);
    const isUrlCheck = pathname.split('/')
    const active = activeMenu === key || activeMenu.startsWith(key + '-');
    const onRouteChange = (url: string) => {
        if (item!.to && item!.to === url) {
            setActiveMenu(key);
        }
    };

    useEffect(() => {
        onRouteChange(pathname);
    }, [pathname, searchParams]);

    const itemClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        console.log(event)
        if (item!.disabled) {
            event.preventDefault();
            return;
        }

    //execute command
    if (item!.command) {
      item!.command({ originalEvent: event, item: item });
    }

    // toggle active state
    if (item!.items) setActiveMenu(active ? (props.parentKey as string) : key);
    else setActiveMenu(key);
  };

  const subMenu = item!.items && item!.visible !== false && (
    <CSSTransition
      nodeRef={nodeRef}
      timeout={{ enter: 1000, exit: 450 }}
      classNames="layout-submenu"
      in={props.root ? true : active}
      key={item!.label}
    >
      <ul ref={nodeRef}>
        {item!.items.map((child, i) => {
          return (
            <AppMenuitem
              item={child}
              index={i}
              className={child.badgeClass}
              parentKey={key}
              key={child.label}
            />
          );
        })}
      </ul>
    </CSSTransition>
  );

  return (
    <li
      className={classNames({
        "layout-root-menuitem": props.root,
        "active-menuitem": active,
      })}
    >

      {(!item!.to || item!.items) && item!.visible !== false ? (
        <a
          href={item!.url}
          onClick={(e) => itemClick(e)}
          className={classNames(item!.class, "p-ripple")}
          target={item!.target}
          tabIndex={0}
        >
          <i className={classNames("layout-menuitem-icon", item!.icon)}></i>
          <span className="layout-menuitem-text">{t(`${item!.label}`)}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
          <Ripple />
        </a>
      ) : null}

      {item!.to && !item!.items && item!.visible !== false ? (
        <Link
          to={item!.to}
          replace={item!.replaceUrl}
          target={item!.target}
          onClick={(e) => itemClick(e)}
          className={classNames(item!.class, "p-ripple", {
            "active-route": isUrlCheck.includes(item!.name as string),
          })}
          tabIndex={0}
        >
          <i className={classNames("layout-menuitem-icon", item!.icon)}></i>
          <span className="layout-menuitem-text">{t(`${item!.label}`)}</span>
          {item!.items && (
            <i className="pi pi-fw pi-angle-down layout-submenu-toggler"></i>
          )}
          <Ripple />
        </Link>
      ) : null}

      {subMenu}
    </li>
  );
};

export default AppMenuitem;
