import React, { useState } from "react";
import axios from "axios";

//SEMANTIC UI
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

export default function Auth(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //CATCH INPUT
  const HandleUser = ev => {
    //console.log(ev.currentTarget.value);
    setUsername(ev.currentTarget.value);
  };

  const HandlePassword = ev => {
    //console.log(ev.currentTarget.value);
    setPassword(ev.currentTarget.value);
  };

  //AXIOS POST
  const connect = ev => {
    ev.preventDefault();

    axios
      .post("http://localhost:8080/auth/local", {
        identifier: username,
        password: password
      })
      .then(response => {
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        props.setUser({ username: username, id: response.data.user.id, token: response.data.jwt, cagnote: response.data.user.cagnote });
        props.setIslog(true);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  };

  return (
    <form>
      <label htmlFor="user">Username</label>
      <Input name="user" type="text" onChange={HandleUser} />
      <label htmlFor="password">Mot de passe</label>
      <Input type="password" onChange={HandlePassword} />
      <button onClick={connect}>Connect</button>
    </form>
  );
}
