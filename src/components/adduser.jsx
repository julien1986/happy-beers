import React, { useContext, useState } from "react";
import axios from "axios";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Input, Button } from "semantic-ui-react";

export default function AddUser() {
  const { user } = useContext(DataContext);
  const [addUser, setAddUser] = useState();
  const [addEmail, setAddEmail] = useState();
  const [addPassword, setAddPassword] = useState();
  const [addCurrency, setAddCurrency] = useState();
  const url = "http://localhost:8080/auth/local/register";

  const HandleUser = ev => {
    setAddUser(ev.currentTarget.value);
  };
  const HandleEmail = ev => {
    setAddEmail(ev.currentTarget.value);
  };
  const HandlePassword = ev => {
    setAddPassword(ev.currentTarget.value);
  };
  const HandleCurrency = ev => {
    setAddCurrency(ev.currentTarget.value);
  };
  //AXIOS POST
  async function Add(url) {
    const adduser = {
      username: addUser,
      password: addPassword,
      email: addEmail,
      provider: "local",
      confirmed: true,
      blocked: false,
      role: {
        id: 3
      },
      cagnote: addCurrency
    };
    try {
      const response = await axios.post(url, adduser);
      //console.log(response);
    } catch (error) {
      //console.log(error);
    }
    //reset le state après que la requête soit effectuée
    alert(`l'utilisateur ${addUser} à bien été ajouter dans la base de donnée`);
    setAddUser([]);
  }

  return (
    <>
      <label htmlFor="user">Username :</label>
      <Input name="user" type="text" onChange={HandleUser} />
      <label htmlFor="email">Email :</label>
      <Input name="user" type="text" onChange={HandleEmail} />
      <label htmlFor="password">Mot de passe :</label>
      <Input type="password" onChange={HandlePassword} />
      <label htmlFor="currency">Currency :</label>
      <Input type="number" onChange={HandleCurrency} />
      <Button
        onClick={() => {
          Add(url);
        }}
      >
        Ajouter
      </Button>
    </>
  );
}
