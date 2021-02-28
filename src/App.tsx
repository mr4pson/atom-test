import 'antd/dist/antd.css';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getRoutes } from './routes/routes';
import { TypeRoute } from 'routes/type';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {getRoutes().map((route: TypeRoute) => (
            <Route exact={route.exact} key={route.path} path={route.path}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
