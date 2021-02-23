import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getRoutes } from './routes/routes';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          {getRoutes().map((route) => (
            <Route path={route.path}>
              {route.component}
            </Route>
          ))}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
