import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

//APP CONTEXT
import { DataProvider } from "./context/DataContext";

//APP COMPONENT
import Auth from "./components/auth";
import Barman from "./components/barman";
import Client from "./components/client";

function App() {
  //STATE
  const [user, setUser] = useState({ username: "", password: "", id: "", token: "" });
  const [islog, setIslog] = useState(false);

  return (
    <div className="App">
      {/*si je ne suis pas log, j'affiche le panneau de connexion */}
      {islog !== true ? (
        <Auth setUser={setUser} setIslog={setIslog}></Auth> /*SINON je fais*/
      ) : (
        <DataProvider
          value={{
            user: user,
            resetUser: setUser,
            islog: islog,
            changeLog: setIslog
          }}
        >
          {" "}
          {/*si je suis barman -> id=2 et que je suis log j'affiche le panneau barman */}
          {user.id === 2 && islog === true ? <Barman /> : false}
          {/*si je ne suis pas barman -> id !=2 MAIS que je suis log j'affiche le panneau client */}
          {user.id !== 2 && islog === true ? <Client /> : false}
        </DataProvider>
      )}
    </div>
  );
}

export default App;
