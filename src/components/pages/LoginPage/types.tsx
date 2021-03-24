export type JwtPair = {
  access_token: string;
  expires_in: number;
  token_type: string;
  refresh_token: string;
  currentDate: number;
}

export type TypeAuthLogin = {
  access_token: string;
  refresh_token: string;
};

export type TypeUser = {
  username: string;
  password: string;
}

export type TypeAuthLoginResponse = {
  error?: LoginError;
};

export enum LoginError {
  MISSING_FIELDS = 'MISSING_FIELDS',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  ACCOUNT_BLOCKED = 'ACCOUNT_BLOCKED',
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  DEACTIVATED_USER = 'DEACTIVATED_USER',
  RESET_REQUIRED = 'RESET_REQUIRED',
}

export type TypeUseAuthHookResult = {
  loading: boolean;
  login: (user: TypeUser) => Promise<TypeAuthLoginResponse>;
  logout: () => void;
  authenticated: boolean;
  errorInfo: { message: string };
}
