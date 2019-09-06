import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Container } from "semantic-ui-react";

export default function Stock() {
  const { user } = useContext(DataContext);
  const [listCommandes, setListCommandes] = useState([]);

  return <h1>Je suis le stock</h1>;
}
