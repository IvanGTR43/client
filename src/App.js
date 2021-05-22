import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import rutes from "./config/routes"
import './App.scss';
function App() {
  return (
    <div className="app">
      <h1>Hola</h1>
      <Router>
        <Switch>
          {rutes.map((route, index)=>(
            <RouteWithSubRoutes {...route} key={index}/>
          ))}
        </Switch>
      </Router>
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
