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
import SmallScreenNavigation from 'components/modules/SmallScreenNavigation';
import { useState } from 'react';

function App() {
  const [isSmallScreenNavigationVisible, setIsSmallScreenNavigationVisible] = useState<boolean>(false);

  return (
    <div className="App">
      <Router>
        <div className="container">
          <Navigation
            isSmallScreenNavigationVisible={isSmallScreenNavigationVisible}
            setIsSmallScreenNavigationVisible={setIsSmallScreenNavigationVisible}
            navigationType={NavigationType.HEADER}
          />
        </div>
        <div className="page">
          {
            isSmallScreenNavigationVisible ?
              <SmallScreenNavigation
                isSmallScreenNavigationVisible={isSmallScreenNavigationVisible}
                setIsSmallScreenNavigationVisible={setIsSmallScreenNavigationVisible}
              />
              : null
          }
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
