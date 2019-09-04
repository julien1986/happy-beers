import React, { useContext } from "react";

//APP CONTEXT
import DataContext from "../context/DataContext";

export default function Barman() {
  const { user } = useContext(DataContext);

  console.log(DataContext);

  return <h1>Bonjour {user.username}</h1>;
}
