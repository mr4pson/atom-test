import classNames from "classnames";
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
import { useGetMenu } from "./useGetMenu";
import { connect } from "react-redux";
import { setLinksToState } from 'redux/reducers/Menu.reducer';

type Props = {
  navigationType: NavigationType;
  isSmallScreenNavigationVisible?: boolean | undefined;
  links: TypeLink[];
  setIsSmallScreenNavigationVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  setLinksToState: (links: TypeLink[]) => (dispatch: any) => void;
};

function Navigation(props: Props): JSX.Element {
  let location = useLocation();
  const [links, setLinks] = useState<TypeLink[]>([]);
  const [footerLinks, setFooterLinks] = useState<TypeLink[]>([]);

  const { loading, receivedLinks, getLinks } = useGetMenu();

  const additionalLinks: TypeLink[] = [];
  if (props.navigationType === NavigationType.FOOTER) {
    // additionalLinks.push({
    //   name: navigationTranslations.privacyPolicy,
    //   path: navigationPaths.PRIVACY_POLICY,
    // });
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

  function getNavigationLinks(link: TypeLink): JSX.Element {
    return (link.path === 'https://yandex.ru' ?
      <a href={link.path} target="_blank" rel="noreferrer">{link.name}</a>
      : (
        link.path === 'our-partners'
            ? <Link to={paths[Page.OUR_PARTNERS]}>{link.name}</Link>
          : <Link to={link.path}>{link.name}</Link>
      )
    )
  }

  useEffect(() => {
    if (props.navigationType === NavigationType.HEADER) {
      getLinks();
    }
  }, [location]);

  useEffect(() => {
    if (props.navigationType === NavigationType.HEADER) {
      setLinks(receivedLinks)
    }
  }, [loading]);

  useEffect(() => {
    props.setLinksToState(links);
  }, [links])

  useEffect(() => {
    setFooterLinks(props.links.concat(additionalLinks));
  }, [props.links])

  return (
    <>
      {(props.navigationType === NavigationType.HEADER
        ? links.length : footerLinks.length) && <div className={classNames(styles["header"], {
          [styles["header-footer"]]: props.navigationType === NavigationType.FOOTER
        })}>
          <div className={styles["container"]}>
            <Link
              onClick={() => props.setIsSmallScreenNavigationVisible!(false)}
              to={paths[Page.HOME]}
            >
              <div className={styles["header__logo"]} />
            </Link>
            <ul className={getNavigationClassName()}>
              {!location.pathname.includes(paths[Page.ADMIN])
                ? (props.navigationType === NavigationType.HEADER ? links : footerLinks)
                  .map((link: TypeLink) => (
                    <li key={link.path}>
                      {!link.children?.length && !link.deletable
                        ? getNavigationLinks(link)
                        : <div className={styles['link']}>
                          <div>{link.name}</div>
                          {link?.children?.length ? <ul className={styles['link__children']}>
                            {link.children!?.map((childLink) => (
                              <li className={styles['link__child']}>
                                <Link to={link.path + childLink.path}>{childLink.name}</Link>
                              </li>))}
                          </ul> : ''}
                        </div>}
                    </li>
                  ))
                : null}
            </ul>
            <div className={styles["user-info"]}>
              <AuthButton
                isSmallScreenNavigationVisible={props.isSmallScreenNavigationVisible}
                setIsSmallScreenNavigationVisible={props.setIsSmallScreenNavigationVisible!}
                links={links}
                navigationType={props.navigationType}
              />
            </div>
          </div>
        </div>}
    </>
  );
}

const mapStateToProps = (state: any) => {
  return {
    links: state.menu?.links,
  }
}

export default connect(mapStateToProps, { setLinksToState })(memo(Navigation));