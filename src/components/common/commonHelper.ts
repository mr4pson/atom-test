import { getJwtPair } from "components/pages/LoginPage/helpers";
import { extractHS256Token } from "jwt-hs256";
import { TypeUserInfo } from './types';
import { notification } from "antd";

export function getUserInfo(): TypeUserInfo | null {
  const jwtPair: string | null = 
    localStorage.getItem('jwtPair') ? localStorage.getItem('jwtPair') : '';
  const currentJwt: string = jwtPair ? JSON.parse(jwtPair) : '';
  if (!currentJwt) {
    return null;
  }
  const jwtInfo = extractHS256Token(currentJwt, 'rzxlszyykpbgqcflzxsqcysyhljt');
  const userInfo = {
    id: jwtInfo.sub,
    username: jwtInfo.upn,
    email: jwtInfo.email,
    role: jwtInfo.roles[0],
    expire: jwtInfo.exp,
    fullName: jwtInfo.fullName,
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

export const generateUiniqueId = () => {
  return Math.random().toString(16).slice(2);
};


export function getImageUrl(fileName: string): string {
  return `/api/attachments/${fileName}`;
}
