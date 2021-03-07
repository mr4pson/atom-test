import NewsPage from "components/pages/AdminPage/NewsPage";
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
            type: Page.MAIN,
            path: paths[Page.MAIN],
            component: <div />
        },
        {
            type: Page.MENU,
            path: paths[Page.MAIN],
            component: <div />
        },
        {
            type: Page.STATISTICS,
            path: paths[Page.MAIN],
            component: <div />
        },
    ]
}