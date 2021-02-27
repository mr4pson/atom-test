import 'antd/dist/antd.css';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getRoutes } from './routes/routes';
import { TypeRoute } from 'routes/type';
import { Page, paths } from 'routes/constants';
import LoginPage from 'components/pages/LoginPage';
import HomePage from 'components/pages/HomePage';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* {getRoutes().map((route: TypeRoute) => (
            <Route key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))} */}
          <Route path={paths[Page.LOGIN]}>
            <LoginPage />
          </Route>
          <Route path={paths[Page.HOME]}>
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
