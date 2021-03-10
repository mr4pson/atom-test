import NewsPage from "components/pages/AdminPage/NewsPage";
import StatisticsPage from "components/pages/AdminPage/StatisticsPage";
import { Page, paths } from "./constants";
import { TypeRoute } from "./type";


export function getRoutes(): TypeRoute[] {
    return [
        {
            type: Page.NEWS,
            path: paths[Page.NEWS],
            component: <NewsPage />
        },
        {
            type: Page.STATISTICS,
            path: paths[Page.STATISTICS],
            component: <StatisticsPage />
        },
        {
            type: Page.MENU,
            path: paths[Page.MENU],
            component: <div />
        },
        {
            type: Page.MAIN,
            path: paths[Page.MAIN],
            component: <div />
        },
    ]
}