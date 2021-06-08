import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import rutes from "./config/routes";
import AuthProviders from "./providers/AuthProviders";
import './App.scss';
function App() {
  return (
    <div className="app">
      <AuthProviders>
      <Router>
        <Switch>
          {rutes.map((route, index)=>(
            <RouteWithSubRoutes key={index} {...route} />
          ))}
        </Switch>
      </Router>
      </AuthProviders>
    </div>
  );
}

function RouteWithSubRoutes(route){
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component routes={route.routes} {...props}/>}
    />
  );
}
export default App;
