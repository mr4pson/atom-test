import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage";
import { Page, paths } from "./constants";
import { TypeRoute } from "./type";

export function getRoutes(): TypeRoute[] {
    return [
        {
            type: Page.HOME,
            path: paths[Page.HOME],
            component: <HomePage/>,
            exact: true,
        },
        {
            type: Page.LOGIN,
            path: paths[Page.LOGIN],
            component: <LoginPage />
        }
    ]
}