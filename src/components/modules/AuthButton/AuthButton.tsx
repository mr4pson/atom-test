import { TypeUserInfo } from "components/common/types";
import Icon from "components/uiKit/Icon";
import { logoutIcon, userInfoIcon, arrowUpIcon } from "icons";
import { memo, useEffect, useState } from "react"
import { useLocation } from "react-router";
import { paths, Page } from "routes/constants";
import { NavigationType } from "../Navigation/constants";
import styles from "../Navigation/Navigation.module.scss";
import authBtnStyles from "./AuthButton.module.scss";
import { getShortFullName } from "./utils";
import AuthDropDown from 'components/modules/AuthDropDown';
import classNames from 'classnames';
import { generateUiniqueId } from "components/common/commonHelper";
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useAuth } from "components/pages/LoginPage/useAuth";

type Props = {
  navigationType: NavigationType;
  userInfo: TypeUserInfo;
}

function AuthButton(props: Props): JSX.Element {
  const location = useLocation();
  const [isDropDownVisible, setIsDropDownVisible] = useState<boolean>(false);
  const [uniqueId] = useState<string>(generateUiniqueId());

  const { logout } = useAuth();

  function getAuthButtonClassNames(): string {
    return classNames(authBtnStyles['auth-button'], {
      [authBtnStyles['auth-button_justify-center']]: location.pathname === paths[Page.LOGIN]
        || location.pathname === paths[Page.SIGN_UP] || location.pathname === paths[Page.FORGOT_PASSWORD]
        || (location.pathname === paths[Page.HOME] && !getJwtPair()),
      [authBtnStyles['auth-button_justify-end']]: location.pathname.includes('admin')
        || location.pathname === paths[Page.PRIVATE_OFFICE],
    })
  }

  function goToTopOfPage(): void {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  }

  const changeDropDownVisibility = () => {
    setTimeout(() => {
      setIsDropDownVisible(prevState => !prevState);
    });
  };

  useEffect(() => {
    window.addEventListener("click", function (e: any) {
      if (!document.getElementsByClassName(uniqueId)[0]?.contains(e.target)) {
        setIsDropDownVisible(false);
      }
    });
  }, []);

  function renderUserInfoIcon(): JSX.Element {
    if (props.navigationType === NavigationType.HEADER) {
      if (
        location.pathname === '/private-office' ||
        location.pathname.includes('/admin')
      ) {
        return (
          <Icon
            className={styles["nav-bar-header__logout-icon"]}
            path={logoutIcon.path}
            viewBox={logoutIcon.viewBox}
            title="AtomTest"
            onClick={logout}
          />
        );
      }
      return (
        <Icon
          className={styles["nav-bar-header__user-info-icon"]}
          path={userInfoIcon.path}
          viewBox={userInfoIcon.viewBox}
          title="AtomTest"
        />
      );
    }
    return (
      <Icon
        className={styles["nav-bar-footer__icon"]}
        path={arrowUpIcon.path}
        viewBox={arrowUpIcon.viewBox}
        title="AtomTest"
        onClick={goToTopOfPage}
      />
    );
  }

  function getDropDownVisibilityFlag() {
    if (
      props.navigationType === NavigationType.HEADER &&
      location.pathname !== '/private-office' &&
      !location.pathname.includes('admin')
    ) {
      return false;
    }
    return true;
  }

  return <div className={authBtnStyles['auth-button-wrapper']}>
    <div className={getAuthButtonClassNames()}>
      <button
        className={authBtnStyles["user-info__icon"]}
        onClick={changeDropDownVisibility}
      >
        {renderUserInfoIcon()}
      </button>
      <button
        className={classNames(authBtnStyles['auth-button__user-name-wrapper'], {
          [authBtnStyles['auth-button__user-name-wrapper_focus']]: isDropDownVisible,
          [authBtnStyles['auth-button__user-name-wrapper_hide']]: !getJwtPair() || getDropDownVisibilityFlag(),
        })}
        onClick={changeDropDownVisibility}
      >
        {getShortFullName(props.userInfo?.fullName)}
      </button>
    </div>
    <AuthDropDown
      className={uniqueId}
      isDropDownVisible={isDropDownVisible}
      navigationType={props.navigationType}
    />
  </div>
}

export default memo(AuthButton);
