import React, { useState, useContext } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { List, Segment } from "semantic-ui-react";

export default function Bieres() {
  const { user } = useContext(DataContext);
  const [listBeers, setListBeers] = useState([]);
  const token = user.token;

  axios
    .get("http://localhost:8080/products", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      //console.log("Data: ", response.data);
      setListBeers(response.data);
    })
    .catch(error => {
      console.log("An error occurred:", error);
    });

  return (
    <Segment inverted>
      <List divided inverted relaxed>
        {listBeers.map(beer => (
          <List.Item>
            <List.Content>
              <List.Header>{beer.name}</List.Header>
              An excellent companion
            </List.Content>
          </List.Item>
        ))}
      </List>
    </Segment>
  );
}
