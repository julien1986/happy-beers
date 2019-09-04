import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";

//APP CONTEXT
import { DataProvider } from "./context/DataContext";

//APP COMPONENT
import Auth from "./components/auth";
import Barman from "./components/barman";
import Client from "./components/client";

//ROUTE

function App() {
  //STATE
  const [user, setUser] = useState({ username: "", password: "", id: "" });
  const [islog, setIslog] = useState(false);
  console.log(setUser, setIslog);

  return (
    <div className="App">
      <Router>
        <Switch>
          <DataProvider>
            <Route exact path="/">
              <Auth
                value={{
                  user: user => {
                    setUser(user);
                  },
                  Islog: key => {
                    setIslog(key);
                  }
                }}
              ></Auth>
            </Route>
            <Route path="/barman" component={Barman}></Route>
            <Route path="/client" component={Client}></Route>
          </DataProvider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
