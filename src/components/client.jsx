import React, { useContext } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

//IMPORT COMPONENT
import Bieres from "./bieres";
import CodeQR from "./codeQR";

//SEMANTIC UI
import { Menu } from "semantic-ui-react";

//APP CONTEXT
import DataContext from "../context/DataContext";

export default function Client() {
  const { user, changeLog, resetUser } = useContext(DataContext);

  const HandleDisconnect = () => {
    resetUser({ username: "", password: "", id: "", token: "" });
    changeLog(false);
  };

  return (
    <>
      <h1>Bonjour {user.username}</h1>
      <Router>
        <Menu>
          <Menu.Item name="bieres">
            <Link to="/Bieres">Commander des bières</Link>
          </Menu.Item>
          <Menu.Item name="codeQR">
            <Link to="/CodeQR">Montrer le QR Code</Link>
          </Menu.Item>
          <Menu.Item name="Auth">
            <Link to="/" onClick={HandleDisconnect}>
              Se déconnecter
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/Bieres">
            <Bieres />
          </Route>
          <Route exact path="/CodeQR">
            <CodeQR />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
