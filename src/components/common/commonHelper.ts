import { getJwtPair } from "components/pages/LoginPage/helpers";
import { extractHS256Token } from "jwt-hs256";
import { TypeUserInfo } from './types';
import { notification } from "antd";

export function getUserInfo(): TypeUserInfo {
  const currentJwt = getJwtPair();
  const jwtInfo = extractHS256Token(currentJwt, 'rzxlszyykpbgqcflzxsqcysyhljt');
  const userInfo = {
    username: jwtInfo.upn,
    email: jwtInfo.email,
    role: jwtInfo.roles[0],
    expire: jwtInfo.exp,
  }

  return userInfo;
}

const close = () => {
  console.log(
    'Notification was closed. Either the close button was clicked or duration time elapsed.',
  );
};

export const openNotification = (type: string, message: string) => {
    const key = `open${Date.now()}`;  
    notification[type]({
      message: message,
      key,
      onClose: close,
    });
};
