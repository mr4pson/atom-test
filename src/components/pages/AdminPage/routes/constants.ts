export enum Page {
  NEWS = 'NEWS',
  MAIN = 'MAIN',
  MENU = 'MENU',
  STATISTICS = 'STATISTICS',
  NEWS_CREATE = 'NEWS_CREATE',
  PARTICIPANTS = 'PARTICIPANTS',
  FAQ = 'FAQ',
  FAQ_CREATE = 'FAQ_CREATE',
  FAQ_ROUTE = 'FAQ_ROUTE'
}

export const paths = {
  // [Page.USER_TEST_ROUTE]: '/user-test/:questionNumber',
  [Page.NEWS]: '/admin/news',
  [Page.MAIN]: '/admin/',
  [Page.MENU]: '/admin/menu',
  [Page.STATISTICS]: '/admin/statistics',
  [Page.NEWS_CREATE]: '/admin/news/create',
  [Page.PARTICIPANTS]: '/admin/participants',
  [Page.FAQ]: '/admin/faq',
  [Page.FAQ_CREATE]: '/admin/faq/create',
  [Page.FAQ_ROUTE]: '/admin/faq/:id'
}