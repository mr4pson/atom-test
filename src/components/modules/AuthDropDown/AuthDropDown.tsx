import { memo } from "react"
import styles from "./AuthDropDown.module.scss";
import classNames from 'classnames';
import { getJwtPair } from "components/pages/LoginPage/helpers";
import { useAuth } from "components/pages/LoginPage/useAuth";
import { useHistory, useLocation } from "react-router";
import { paths, Page } from "routes/constants";
import { getUserInfo } from "components/common/commonHelper";
import { userType } from "components/common/types";
import { NavigationType } from "../Navigation/constants";


type Props = {
  className: string;
  isDropDownVisible: boolean;
  navigationType: NavigationType;
}

function AuthDropDown(props: Props): JSX.Element {
  let history = useHistory();
  const location = useLocation();
  const { logout } = useAuth();
  const jwtPair = getJwtPair();

  const userInfo = getUserInfo();

  function getAuthDropDownClassNames(): string {
    return classNames(
      props.className,
      styles['auth-dropdown'],
      {
        [styles['auth-dropdown_hide']]: !props.isDropDownVisible ||
          (location.pathname === paths[Page.LOGIN] ||
            location.pathname === paths[Page.SIGN_UP] ||
            location.pathname === paths[Page.FORGOT_PASSWORD] ||
            location.pathname === paths[Page.PRIVATE_OFFICE] ||
            location.pathname.includes(paths[Page.ADMIN]) ||
            props.navigationType === NavigationType.FOOTER
          )
      }
    )
  }

  function onSignUp() {
    history.push(paths[Page.SIGN_UP])
  }

  function onLogin() {
    history.push(paths[Page.LOGIN]);
  }

  function onPrivatePanel() {
    if (userInfo?.role === userType.USER) {
      history.push(paths[Page.PRIVATE_OFFICE]);
    } else {
      history.push(paths[Page.ADMIN]);
    }
  }

  function handleSignIn(): void {
    if (!getJwtPair()) {
      onLogin();
    } else {
      onPrivatePanel();
    }
  }

  function handleSignUp(): void {
    if (getJwtPair()) {
      logout();
    } else {
      onSignUp();
    }
  }

  return <div
    className={getAuthDropDownClassNames()}
  >
    <div onClick={handleSignIn} className={styles['auth-dropdown__item']}>
      {!jwtPair ? 'Авторизоваться' :
        (userInfo?.role === userType.USER ? 'Войти в личный кабинет' : 'Войти в админ панель')
      }
    </div>
    <div className={styles['auth-dropdown__divider']} />
    <div onClick={handleSignUp} className={styles['auth-dropdown__item']}>
      {jwtPair ? 'Выйти' : 'Зарегистрироваться'}
    </div>
  </div>
}

export default memo(AuthDropDown);