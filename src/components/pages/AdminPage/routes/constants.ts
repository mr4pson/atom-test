export enum Page {
  NEWS = 'NEWS',
  MAIN = 'MAIN',
  MENU = 'MENU',
  STATISTICS = 'STATISTICS',
}

export const paths = {
  // [Page.USER_TEST_ROUTE]: '/user-test/:questionNumber',
  [Page.NEWS]: '/admin/news',
  [Page.MAIN]: '/admin/',
  [Page.MENU]: '/admin/menu',
  [Page.STATISTICS]: '/admin/statistics',
}