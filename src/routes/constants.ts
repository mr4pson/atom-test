export enum Page {
  HOME = 'HOME',
  PRIVATE_OFFICE = 'PRIVATE_OFFICE',
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  TEST = 'TEST',
  ADMIN = 'ADMIN',
}

export const paths = {
  [Page.LOGIN]: '/login',
  [Page.HOME]: '/',
  [Page.PRIVATE_OFFICE]: '/private-office',
  [Page.SIGN_UP]: '/sign-up',
  [Page.FORGOT_PASSWORD]: '/forgot-password',
  [Page.TEST]: '/test',
  [Page.ADMIN]: '/admin',
}