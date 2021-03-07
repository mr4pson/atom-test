import { memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { headerLinks, footerLinks, NavigationType, navigationTranslations } from "./constants";
import styles from './Navigation.module.scss';
import { TypeLink } from "./types";
import classNames from 'classnames';
import Icon from 'components/uiKit/Icon';
import { arrowUpIcon, logoutIcon, userInfoIcon } from "icons";
import { useHistory, useLocation } from "react-router";
import { Page, paths } from "routes/constants";

type Props = {
    navigationType: NavigationType;
}

function Navigation(props: Props): JSX.Element {
    let links: TypeLink[] = [];
    let history = useHistory();
    let location = useLocation();

    function logout(): void {
        history.push('/login');
    }

    function getNavigationClassName(): string {
        return classNames({
            [styles['nav-bar-header']]: props.navigationType === NavigationType.HEADER,
            [styles['nav-bar-footer']]: props.navigationType === NavigationType.FOOTER,
        })
    }

    function renderUserInfoIcon(): JSX.Element {
        if (props.navigationType === NavigationType.HEADER) {
            if (location.pathname === paths[Page.PRIVATE_OFFICE] 
                || location.pathname === paths[Page.ADMIN]) {
                return  <Icon
                    className={styles['nav-bar-header__logout-icon']}
                    path={logoutIcon.path}
                    viewBox={logoutIcon.viewBox}
                    title="AtomTest"
                />
            }
            return  <Icon
                className={styles['nav-bar-header__user-info-icon']}
                path={userInfoIcon.path}
                viewBox={userInfoIcon.viewBox}
                title="AtomTest"
            />
        }
        return <Icon
            className={styles['nav-bar-footer__icon']}
            path={arrowUpIcon.path}
            viewBox={arrowUpIcon.viewBox}
            title="AtomTest"
        />
    }

    function renderPrivateOfficeLink(): JSX.Element | null {
        if (props.navigationType === NavigationType.HEADER 
            && (location.pathname !== paths[Page.LOGIN] 
                && location.pathname !== paths[Page.SIGN_UP] 
                && location.pathname !== paths[Page.FORGOT_PASSWORD]
                && location.pathname !== paths[Page.PRIVATE_OFFICE])) {
            return  <Link to={paths[Page.PRIVATE_OFFICE]} className={styles['user-info__private-office']}>
                {navigationTranslations.privateOffice}
            </Link>
        }
        return null;
    }
    function renderAdminPageLink(): JSX.Element | null {
        if (props.navigationType === NavigationType.HEADER 
            && (location.pathname !== paths[Page.LOGIN] 
                && location.pathname !== paths[Page.SIGN_UP] 
                && location.pathname !== paths[Page.FORGOT_PASSWORD]
                && location.pathname !== paths[Page.ADMIN]
                && location.pathname !== `${paths[Page.ADMIN]}/news`)) {
            return  <Link to={paths[Page.ADMIN]} className={styles['user-info__admin-page']}>
                {navigationTranslations.adminPage}
            </Link>
        }
        return null;
    }

    if (props.navigationType === NavigationType.HEADER) {
        links = headerLinks;
    } else {
        links = footerLinks;
    };

    return(
        <div className={styles['header']}>
            <div className={styles['container']}>
                <Link to={paths[Page.HOME]}><div className={styles['header__logo']}/></Link>
                <ul className={getNavigationClassName()}>
                    {links.map((link: TypeLink) => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <div className={styles['user-info']}>
                    <button onClick={logout} className={styles['user-info__icon']}>
                        {renderUserInfoIcon()}
                    </button>
                    {renderPrivateOfficeLink()}
                    {renderAdminPageLink()}
                </div>
            </div>
        </div>
    );
}

export default memo(Navigation);