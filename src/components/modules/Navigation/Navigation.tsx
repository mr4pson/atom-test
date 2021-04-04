import classNames from "classnames";
import { TypeUserInfo } from "components/common/types";
import AuthButton from "components/modules/AuthButton";
import { memo, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Page, paths } from "routes/constants";
import {
  navigationPaths,
  navigationTranslations, NavigationType
} from "./constants";
import styles from "./Navigation.module.scss";
import { TypeLink } from "./types";
import { HashLink as Link } from 'react-router-hash-link';
import axios from "axios";

type Props = {
  navigationType: NavigationType;
  userInfo?: TypeUserInfo;
};

function Navigation(props: Props): JSX.Element {
  let location = useLocation();
  const [links, setLinks] = useState<TypeLink[]>([]);

  const additionalLinks: TypeLink[] = [];
  if (props.navigationType === NavigationType.FOOTER) {
    additionalLinks.push({
      name: navigationTranslations.privacyPolicy,
      path: navigationPaths.PRIVACY_POLICY,
    });
  }

  const getMenus = async () => {
    const responnse = await axios.get('/api/menus/get-visible-menus');
    const links: TypeLink[] = responnse.data.map((menu) => ({
      name: menu.title,
      path: menu.url,
      deletable: menu.deletable,
      children: menu.subcategories.map((subcategory) => ({
        name: subcategory.title,
        path: subcategory.url,
      })),
    }));
    setLinks(links.concat(additionalLinks));
  }

  function getNavigationClassName(): string {
    return classNames({
      [styles["nav-bar-header"]]:
        props.navigationType === NavigationType.HEADER,
      [styles["nav-bar-header_hide"]]: location.pathname.includes(
        paths[Page.ADMIN]
      ),
      [styles["nav-bar-footer"]]:
        props.navigationType === NavigationType.FOOTER,
    });
  }

  useEffect(() => {
    getMenus();
  }, [location]);

  return (
    <>
      {links.length && <div className={classNames(styles["header"], {
        [styles["header-footer"]]: props.navigationType === NavigationType.FOOTER
      })}>
        <div className={styles["container"]}>
          <Link to={paths[Page.HOME]}>
            <div className={styles["header__logo"]} />
          </Link>
          <ul className={getNavigationClassName()}>
            {!location.pathname.includes(paths[Page.ADMIN])
              ? links.map((link: TypeLink) => (
                <li key={link.path}>
                  {!link.children?.length && !link.deletable
                    ? <Link to={link.path}>{link.name}</Link> 
                    : <div className={styles['link']}>
                        <div>{link.name}</div>
                        {link?.children?.length ? <ul className={styles['link__children']}>
                          {link.children!?.map((childLink) => (<li className={styles['link__child']}>
                            <Link to={link.path + childLink.path}>{childLink.name}</Link>
                          </li>))}
                        </ul> : ''}
                      </div>}
                </li>
              ))
              : null}
          </ul>
          <div className={styles["user-info"]}>
            <AuthButton userInfo={props.userInfo!} navigationType={props.navigationType} />
          </div>
        </div>
      </div>}
    </>
  );
}

export default memo(Navigation);
