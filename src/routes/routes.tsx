import SignUp from "components/pages/SignUp";
import ForgotPassword from "components/pages/ForgotPassword";
import HomePage from "components/pages/HomePage";
import LoginPage from "components/pages/LoginPage";
import AdminPage from "components/pages/AdminPage"
import { Page, paths } from "./constants";
import { TypeRoute } from "./type";
import PrivateOffice from "components/pages/PrivateOffice";
import UserTest from "components/pages/UserTest";
import UserTestComplete from "components/pages/UserTestComplete";
import PagesPage from "components/pages/PagesPage";
import ChosenPage from "components/pages/ChosenPage";

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
        },
        {
            type: Page.FORGOT_PASSWORD,
            path: paths[Page.FORGOT_PASSWORD],
            component: <ForgotPassword />
        },
        {
            type: Page.SIGN_UP,
            path: paths[Page.SIGN_UP],
            component: <SignUp />
        },
        {
            type: Page.PRIVATE_OFFICE,
            path: paths[Page.PRIVATE_OFFICE],
            component: <PrivateOffice />
        },
        {
            type: Page.USER_TEST_COMPLETE,
            path: paths[Page.USER_TEST_COMPLETE],
            component: <UserTestComplete />
        },
        {
            type: Page.USER_TEST,
            path: paths[Page.USER_TEST_ROUTE],
            component: <UserTest />
        },
        {
            type: Page.ADMIN,
            path: paths[Page.ADMIN],
            component: <AdminPage />
        },
        {
            type: Page.PAGES,
            path: paths[Page.PAGES],
            component: <PagesPage />,
            exact: true,
        },
        {
            type: Page.PAGE_ROUTE,
            path: paths[Page.PAGE_ROUTE],
            component: <ChosenPage />,
        },
    ]
}