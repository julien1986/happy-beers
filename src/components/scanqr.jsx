import React, { useContext, useState, useEffect } from "react";
import axios from "axios";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Container } from "semantic-ui-react";

export default function ScanQR() {
  const { user } = useContext(DataContext);
  const [listCommandes, setListCommandes] = useState([]);

  useEffect(() => {
    //VA CHERCHER LES COMMANDES ET NOURRI LE SCRIPT
    axios
      .get("http://localhost:8080/commandes", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {
        console.log("Data: ", response.data);
        setListCommandes(response.data);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  }, []);

  return <h1>Je suis le scan QR</h1>;
}
