import NewsPage from "components/pages/AdminPage/NewsPage";
import StatisticsPage from "components/pages/AdminPage/StatisticsPage";
import CreateNews from "components/pages/AdminPage/CreateNews";
import { Page, paths } from "./constants";
import { TypeRoute } from "./type";
import Participants from "components/pages/AdminPage/Participants";
import SetCounterParameters from "components/pages/AdminPage/SetCounterParameters";
import FaqPage from "components/pages/AdminPage/FaqPage";
import TestQuestionsPage from "components/pages/AdminPage/TestQuestionsPage";

export function getRoutes(): TypeRoute[] {
  return [
    {
      type: Page.NEWS_CREATE,
      path: paths[Page.NEWS_CREATE],
      component: <CreateNews />,
    },
    {
      type: Page.NEWS,
      path: paths[Page.NEWS],
      component: <NewsPage />,
      exact: true,
    },
    
    {
      type: Page.MENU,
      path: paths[Page.MENU],
      component: <div>Menu page!!!</div>,
    },
    {
      type: Page.PARTICIPANTS,
      path: paths[Page.PARTICIPANTS],
      component: <Participants />,
      exact: true,
    },
    {
      type: Page.STATISTICS,
      path: paths[Page.STATISTICS],
      component: <StatisticsPage />
    },
    {
      type: Page.COUNTER,
      path: paths[Page.COUNTER],
      component: <SetCounterParameters />,
    },
    {
      type: Page.MAIN,
      path: paths[Page.MAIN],
      component: <div />,
    },
    {
      type: Page.FAQ,
      path: paths[Page.FAQ],
      component: <FaqPage />,
    },
    {
      type: Page.TEST_QUESTUIONS,
      path: paths[Page.TEST_QUESTUIONS],
      component: <TestQuestionsPage />,
    },
  ];
}
