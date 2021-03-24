import { JwtPair, LoginError } from "./types";
import { BehaviorSubject } from 'rxjs';
import { AxiosResponse } from 'axios';

const jwtPair = new BehaviorSubject({});

export const setJwtPair = (jwtPair: string): void => {
  localStorage.setItem('jwtPair', JSON.stringify(jwtPair));
}

export const removeJwtPair = () => {
  localStorage.removeItem('jwtPair');
}

export const getJwtPair = (): JwtPair => {
  const jwtPairStringified: string | null = 
    localStorage.getItem('jwtPair') ? localStorage.getItem('jwtPair') : '';
  const jwtPair: JwtPair = jwtPairStringified ? JSON.parse(jwtPairStringified) : '';
  return jwtPair;
}

export const checkIfAccessExpired = (): boolean => {
  const curJwtPair: JwtPair = getJwtPair();
  return Date.now() >= +new Date(curJwtPair ? +curJwtPair.currentDate + curJwtPair.expires_in * 1000 - 5000 : '');
}

export const getRemainingRefreshTime = (): number => {
  const curJwtPair: JwtPair = getJwtPair();
  console.log('refreshDate', new Date(curJwtPair ? +curJwtPair.currentDate + curJwtPair.expires_in * 1000 : ''));
  console.log('now', new Date());
  console.log(jwtPair);
  return +new Date(jwtPair ? Date.now() - +curJwtPair.currentDate + curJwtPair.expires_in * 1000 - 5000 : '');
}

export const observeToken = (logout) => {
  const jwtPair = getJwtPair();
  if (!jwtPair) {
    logout();
  }
}

export const checkToken = (logout): void => {
  observeToken(logout);
}


export function getLoginError(response: AxiosResponse): LoginError {
  switch (response.data.error) {
    default:
      return LoginError.WRONG_PASSWORD;
  }
}
