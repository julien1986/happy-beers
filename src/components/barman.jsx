import React, { useContext } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

//IMPORT COMPONENT
import Commande from "./commande";
import Stock from "./stock";
import AddUser from "./adduser";
import AddCurrency from "./addcurrency";

//SEMANTIC UI
import { Menu } from "semantic-ui-react";

//APP CONTEXT
import DataContext from "../context/DataContext";

export default function Barman() {
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
          <Menu.Item name="Commande">
            <Link to="/Commande">Voir la liste de commande</Link>
          </Menu.Item>
          <Menu.Item name="Stock">
            <Link to="/Stock">Voir le stock</Link>
          </Menu.Item>
          <Menu.Item name="AddUser">
            <Link to="/AddUser">Ajouter un nouvel utilisateur</Link>
          </Menu.Item>
          <Menu.Item name="AddCurrency">
            <Link to="/AddCurrency">Ajouter de l'argent</Link>
          </Menu.Item>
          <Menu.Item name="Auth">
            <Link to="/" onClick={HandleDisconnect}>
              Se déconnecter
            </Link>
          </Menu.Item>
        </Menu>
        <Switch>
          <Route exact path="/Commande">
            <Commande />
          </Route>
          <Route exact path="/Stock">
            <Stock />
          </Route>
          <Route exact path="/AddUser">
            <AddUser />
          </Route>
          <Route exact path="/AddCurrency">
            <AddCurrency />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
