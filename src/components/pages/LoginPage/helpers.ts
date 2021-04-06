import { JwtPair, LoginError, TypeAuthLogin } from "./types";
import axios, { AxiosResponse } from 'axios';
import { getUserInfo } from "components/common/commonHelper";

export const setJwtPair = (jwtPair: string): void => {
  localStorage.setItem('jwtPair', JSON.stringify(jwtPair));
}

export const removeJwtPair = () => {
  localStorage.removeItem('jwtPair');
}


export const getJwtPair = async (): Promise<string> => {
  const jwtPairStringified: string | null = 
    localStorage.getItem('jwtPair') ? localStorage.getItem('jwtPair') : '';
  const jwtPair: string = jwtPairStringified ? JSON.parse(jwtPairStringified) : '';
  const userInfo = getUserInfo();
  if (+new Date() >= (userInfo?.expire! * 1000)) {
    const { data: axiosData } = await axios.post<TypeAuthLogin>(
      `/api/auth/login`, {
          username: userInfo?.username,
          password: localStorage.getItem('password'),
      },
      { withCredentials: true },
    );
    setJwtPair(axiosData.access_token);
    console.log('RefreshToken: ', axiosData.access_token);
    return axiosData.access_token;
  }
  return jwtPair;
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
