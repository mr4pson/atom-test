import { memo } from "react";
import { Link } from "react-router-dom";
import { headerLinks, footerLinks, NavigationType } from "./constants";
import styles from './Navigation.module.scss';
import { TypeLink } from "./types";
import classNames from 'classnames';
import Icon from 'components/uiKit/Icon';
import { arrowUpIcon, userInfoIcon } from "icons";
import { useHistory } from "react-router";

type Props = {
    navigationType: NavigationType;
}

function Navigation(props: Props): JSX.Element {
    let links: TypeLink[] = [];
    let history = useHistory();

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
            return  <Icon
                className={styles['nav-bar-header__icon']}
                path={userInfoIcon.path}
                viewBox={userInfoIcon.viewBox}
                title="Kameleoon"
            />
        }
        return <Icon
            className={styles['nav-bar-footer__icon']}
            path={arrowUpIcon.path}
            viewBox={arrowUpIcon.viewBox}
            title="Kameleoon"
        />
    }

    if (props.navigationType === NavigationType.HEADER) {
        links = headerLinks;
    } else {
        links = footerLinks;
    };

    return(
        <div className={styles['header']}>
            <div className={styles['container']}>
                <div className={styles['header__logo']}/>
                <ul className={getNavigationClassName()}>
                    {links.map((link: TypeLink) => (
                        <li key={link.path}>
                            <Link to={link.path}>{link.name}</Link>
                        </li>
                    ))}
                </ul>
                <button onClick={logout} className={styles['user-info']}>
                    {renderUserInfoIcon()}
                </button>
            </div>
        </div>
    );
}

export default memo(Navigation);