export enum Page {
  NEWS = 'NEWS',
  MAIN = 'MAIN',
  MENU = 'MENU',
  STATISTICS = 'STATISTICS',
  NEWS_CREATE = 'NEWS_CREATE',
  PARTICIPANTS = 'PARTICIPANTS',
  COUNTER = 'COUNTER',
  FAQ = 'FAQ',
  TEST_QUESTUIONS = 'TEST_QUESTUIONS',
  PARTNERS = 'PARTNERS',
  ADD_PARTNER = 'ADD_PARTNERS',
  PROJECT_PERSONS = 'PROJECT_PERSONS',
}

export const paths = {
  [Page.NEWS]: '/admin/news',
  [Page.MAIN]: '/admin/',
  [Page.MENU]: '/admin/menu',
  [Page.STATISTICS]: '/admin/statistics',
  [Page.NEWS_CREATE]: '/admin/news/create',
  [Page.PARTICIPANTS]: '/admin/participants',
  [Page.COUNTER]: '/admin/counter',
  [Page.FAQ]: '/admin/faq',
  [Page.TEST_QUESTUIONS]: '/admin/test-questions',
  [Page.PARTNERS]: '/admin/partners',
  [Page.ADD_PARTNER]: '/admin/partners/create',
  [Page.PROJECT_PERSONS]: '/admin/project-persons',
}