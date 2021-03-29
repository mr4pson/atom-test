import classNames from "classnames";
import { TypeUserInfo } from "components/common/types";
import AuthButton from "components/modules/AuthButton";
import { memo } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Page, paths } from "routes/constants";
import {
  footerLinks, headerLinks,
  navigationTranslations, NavigationType
} from "./constants";
import styles from "./Navigation.module.scss";
import { TypeLink } from "./types";

type Props = {
  navigationType: NavigationType;
  userInfo?: TypeUserInfo;
};

function Navigation(props: Props): JSX.Element {
  let links: TypeLink[] = [];
  let location = useLocation();

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

  if (props.navigationType === NavigationType.HEADER) {
    links = headerLinks;
  } else {
    links = footerLinks;
  }

  return (
    <div className={styles["header"]}>
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
    </div>
  );
}

export default memo(Navigation);
