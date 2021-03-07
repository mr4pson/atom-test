import { TypeLink } from "./types";

export const navigationTranslations = {
    aboutProject: 'О проекте',
    news: 'Новости',
    projectParticipants: 'Лица проекта',
    organisators: 'Организаторы',
    infoPartners: 'Информационные партнеры',
    privacyPolicy: 'Политика конфиденциальности',
    privateOffice: 'Личный кабинет',
    adminPage: 'Администратор',
}

export const navigationPaths = {
    ABOUT: 'about',
    NEWS : 'news',
    PROJECT_PARTICIPANTS: 'project-participants',
    ORGANIZATORS: 'organizators',
    INFO_PARTNERS: 'info-partners',
    PRIVACY_POLICY: 'privacy-policy',
}

export enum NavigationType {
    HEADER = 'HEADER',
    FOOTER = 'FOOTER',
}

export const headerLinks: TypeLink[] = [
  {
      name: navigationTranslations.aboutProject,
      path: navigationPaths.ABOUT,
  },
  {
      name: navigationTranslations.news,
      path: navigationPaths.NEWS,
  },
  {
      name: navigationTranslations.projectParticipants,
      path: navigationPaths.PROJECT_PARTICIPANTS,
  },
  {
      name: navigationTranslations.organisators,
      path: navigationPaths.ORGANIZATORS,
  },
  {
      name: navigationTranslations.infoPartners,
      path: navigationPaths.INFO_PARTNERS,
  },
];

export const footerLinks: TypeLink[] = headerLinks.concat({
    name: navigationTranslations.privacyPolicy,
    path: navigationPaths.PRIVACY_POLICY,
})
