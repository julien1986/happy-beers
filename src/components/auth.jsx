import React, { useState } from "react";
import axios from "axios";

export default function Auth(props) {
  console.log(props);

  let user = {};
  let key = "";

  function HandleUser(ev) {
    //console.log(ev.currentTarget.value);
    user = { ...user, username: ev.currentTarget.value };
  }

  function HandlePassword(ev) {
    //console.log(ev.currentTarget.value);
    user = { ...user, password: ev.currentTarget.value };
  }

  function connect(ev) {
    ev.preventDefault();
    //console.log(user);
    axios
      .post("http://localhost:8080/auth/local", {
        identifier: user.username,
        password: user.password
      })
      .then(response => {
        // Handle success.
        console.log("User profile", response.data.user);
        console.log("User token", response.data.jwt);
        user = { ...user, token: response.data.jwt, id: response.data.user.id };
        console.log(user);
      })
      .catch(error => {
        // Handle error.
        console.log("An error occurred:", error);
      });
  }

  return (
    <form>
      <label htmlFor="user">Username</label>
      <input name="user" type="text" onChange={HandleUser}></input>
      <label htmlFor="user">Mot de passe</label>
      <input type="password" onChange={HandlePassword}></input>
      <button onClick={connect}>Connect</button>
    </form>
  );
}
