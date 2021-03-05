export enum Page {
  HOME = 'HOME',
  PRIVATE_OFFICE = 'PRIVATE_OFFICE',
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  USER_TEST = 'USER_TEST',
  USER_TEST_ROUTE = 'USER_TEST_ROUTE',
  ADMIN = 'ADMIN',
}

export const paths = {
  [Page.LOGIN]: '/login',
  [Page.HOME]: '/',
  [Page.PRIVATE_OFFICE]: '/private-office',
  [Page.SIGN_UP]: '/sign-up',
  [Page.FORGOT_PASSWORD]: '/forgot-password',
  [Page.USER_TEST]: '/user-test',
  [Page.USER_TEST_ROUTE]: '/user-test/:questionNumber',
  [Page.ADMIN]: '/admin',
}