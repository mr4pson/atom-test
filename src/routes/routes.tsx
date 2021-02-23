import HomePage from "../components/pages/HomePage"

type typeRoute = {
    path: string;
    component: JSX.Element;
}

export function getRoutes(): typeRoute[] {
    return [
        {
            path: '/',
            component: <HomePage/>
        }
    ]
}