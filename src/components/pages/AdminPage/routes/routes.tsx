import NewsPage from "components/pages/AdminPage/NewsPage";
import StatisticsPage from "components/pages/AdminPage/StatisticsPage";
import CreateNews from "components/pages/AdminPage/CreateNews";
import { AdminsPage, paths } from "./constants";
import { TypeRoute } from "./type";
import Participants from "components/pages/AdminPage/Participants";
import SetCounterParameters from "components/pages/AdminPage/SetCounterParameters";
import FaqPage from "components/pages/AdminPage/FaqPage";
import TestQuestionsPage from "components/pages/AdminPage/TestQuestionsPage";
import PartnersPage from "components/pages/AdminPage/PartnersPage";
import AddPartnerPage from "components/pages/AdminPage/AddPartnerPage";
import MenuPage from "components/pages/AdminPage/MenuPage";
import MenuDetailPage from "components/pages/AdminPage/MenuDetailPage";
import ProjectPersonsPage from "components/pages/AdminPage/ProjectPersonsPage";
import UpdateParticipant from "components/pages/AdminPage/UpdateParticipant";

export function getRoutes(): TypeRoute[] {
  return [
    {
      type: AdminsPage.NEWS_CREATE,
      path: paths[AdminsPage.NEWS_CREATE],
      component: <CreateNews />,
    },
    {
      type: AdminsPage.NEWS,
      path: paths[AdminsPage.NEWS],
      component: <NewsPage />,
      exact: true,
    },
    {
      type: AdminsPage.NEWS_EDIT_ROUTE,
      path: paths[AdminsPage.NEWS_EDIT_ROUTE],
      component: <CreateNews />,
    },
    {
      type: AdminsPage.MENU,
      path: paths[AdminsPage.MENU],
      component: <MenuPage />,
      exact: true,
    },
    {
      type: AdminsPage.MENU_ROUTE,
      path: paths[AdminsPage.MENU_ROUTE],
      component: <MenuDetailPage />,
    },
    {
      type: AdminsPage.PARTICIPANTS,
      path: paths[AdminsPage.PARTICIPANTS],
      component: <Participants />,
      exact: true,
    },
    {
      type: AdminsPage.ADD_PARTICIPANT,
      path: paths[AdminsPage.ADD_PARTICIPANT],
      component: <UpdateParticipant />,
    },
    {
      type: AdminsPage.EDIT_PARTICIPANT,
      path: paths[AdminsPage.EDIT_PARTICIPANT],
      component: <UpdateParticipant />,
    },
    {
      type: AdminsPage.STATISTICS,
      path: paths[AdminsPage.STATISTICS],
      component: <StatisticsPage />
    },
    {
      type: AdminsPage.COUNTER,
      path: paths[AdminsPage.COUNTER],
      component: <SetCounterParameters />,
    },
    {
      type: AdminsPage.MAIN,
      path: paths[AdminsPage.MAIN],
      component: <div />,
    },
    {
      type: AdminsPage.FAQ,
      path: paths[AdminsPage.FAQ],
      component: <FaqPage />,
    },
    {
      type: AdminsPage.TEST_QUESTUIONS,
      path: paths[AdminsPage.TEST_QUESTUIONS],
      component: <TestQuestionsPage />,
    },
    {
      type: AdminsPage.PARTNERS,
      path: paths[AdminsPage.PARTNERS],
      component: <PartnersPage />,
      exact: true,
    },
    {
      type: AdminsPage.ADD_PARTNER,
      path: paths[AdminsPage.ADD_PARTNER],
      component: <AddPartnerPage />,
    },
    {
      type: AdminsPage.EDIT_PARTNER,
      path: paths[AdminsPage.EDIT_PARTNER_ROUTE],
      component: <AddPartnerPage />,
    },
    {
      type: AdminsPage.PROJECT_PERSONS,
      path: paths[AdminsPage.PROJECT_PERSONS],
      component: <ProjectPersonsPage />,
    },
  ];
}
