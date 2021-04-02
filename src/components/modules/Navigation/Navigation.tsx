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
    const responnse = await axios.get('/api/menus');
    const links = responnse.data.map((menu) => ({
      name: menu.title,
      path: menu.url,
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
  }, []);

  //TODO: remove in future
  function renderAdminPageLink(): JSX.Element | null {
    if (
      props.navigationType === NavigationType.HEADER &&
      location.pathname !== paths[Page.LOGIN] &&
      location.pathname !== paths[Page.SIGN_UP] &&
      location.pathname !== paths[Page.FORGOT_PASSWORD] &&
      location.pathname !== paths[Page.ADMIN] &&
      location.pathname !== `${paths[Page.ADMIN]}/news`
    ) {
      return (
        <Link
          to={paths[Page.ADMIN]}
          className={styles["user-info__admin-page"]}
        >
          {navigationTranslations.adminPage}
        </Link>
      );
    }
    return null;
  }

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
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))
              : null}
          </ul>
          <div className={styles["user-info"]}>
            <AuthButton userInfo={props.userInfo!} navigationType={props.navigationType} />
            {/* {renderAdminPageLink()} */}
          </div>
        </div>
      </div>}
    </>
  );
}

export default memo(Navigation);
