import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import uid from "uid";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Segment, List, Button } from "semantic-ui-react";

export default function Commande() {
  const [listBeers, setListBeers] = useState([]);
  const { user } = useContext(DataContext);

  //AXIOS REQUEST GET BEER
  useEffect(() => {
    axios
      .get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {
        console.log("Data: ", response.data);
        setListBeers(response.data);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  }, []);

  return (
    <Segment>
      <List divided inverted relaxed></List>
    </Segment>
  );
}
