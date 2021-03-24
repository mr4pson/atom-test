import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router";
import { Page, paths } from "routes/constants";
import { getLoginError, removeJwtPair, setJwtPair } from "./helpers";
import { TypeAuthLoginResponse, TypeAuthLogin, TypeUseAuthHookResult, TypeUser } from './types';

export function useAuth(): TypeUseAuthHookResult {
  const history = useHistory();
  const [loading, setLoading] = useState<boolean>(false);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [errorInfo, setErrorInfo] = useState<{ message: string }>({ message: '' });

  async function login({
    username,
    password,
  }: TypeUser): Promise<TypeAuthLoginResponse> {
    setLoading(true);
    try {
      const { data: axiosData } = await axios.post<TypeAuthLogin>(
        `/api/auth/login`, {
            username: username,
            password: password,
        },
        { withCredentials: true },
      );
      console.log(axiosData.access_token);
      setJwtPair(axiosData.access_token);
      setAuthenticated(true);
      history.push(paths[Page.HOME])
      return {};
    } catch ({ response }) {
      setLoading(false);
      setAuthenticated(false);
      console.log(response);
      if (response.status === 401) {
        console.log(errorInfo);
        setErrorInfo({ message: 'Неправильные логин или пароль' });
      } else {
        setErrorInfo({ message: 'Внутрення ошибка сервера' });
      }
      return { error: getLoginError(response) };
    }
  }
  
  function logout(): void {
    removeJwtPair();
    setAuthenticated(false);
  }

  return {
    loading,
    login,
    logout,
    authenticated,
    errorInfo
  }
}