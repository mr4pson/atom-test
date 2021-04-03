import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getRoutes } from './routes/routes';
import { TypeRoute } from 'routes/type';
import { NavigationType } from 'components/modules/Navigation/constants';
import Navigation from 'components/modules/Navigation';
import { getUserInfo } from 'components/common/commonHelper';


function App() {
  const userInfo = getUserInfo();
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navigation userInfo={userInfo!} navigationType={NavigationType.HEADER} />
        </div>
        <div className="page">
          <Switch>
            {getRoutes().map((route: TypeRoute) => (
              <Route exact={route.exact} key={route.path} path={route.path}>
                {route.component}
              </Route>
            ))}
          </Switch>
        </div>
        <div className="container">
          <Navigation navigationType={NavigationType.FOOTER} />
        </div>
      </Router>
    </div>
  );
}

export default App;
