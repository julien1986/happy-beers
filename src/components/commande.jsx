import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import uid from "uid";
import QRreader from "./qrreader";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Segment, List, Button, Popup } from "semantic-ui-react";

export default function Commande() {
  const [listCommandes, setListCommandes] = useState([]);
  const [listBeers, setListBeers] = useState([]);
  const [qr, setqr] = useState(false);
  const { user } = useContext(DataContext);

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

  //AXIOS REQUEST GET BEER
  useEffect(() => {
    axios
      .get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {
        //console.log("Data: ", response.data);
        setListBeers(response.data);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  }, []);

  return (
    <Segment>
      <Popup content={<QRreader IsOpen={setqr} />} on="click" pinned trigger={<Button content="Valider une commande" />} />
      <List divided inverted relaxed>
        {listCommandes.map(listCommande => {
          return (
            <List.Item key={listCommande.num_commande}>
              <List.Content>
                <h4>Commande n° {listCommande.num_commande}</h4>
                {listCommande.liste.map(commande => {
                  return (
                    <Segment key={uid(10)}>
                      {listBeers.map(beer => {
                        if (commande.id === beer.id) {
                          return (
                            <span>
                              <strong>{beer.name}</strong> | quantité : {commande.quantity} | total: {beer.prix * commande.quantity}
                            </span>
                          );
                        } else return;
                      })}
                    </Segment>
                  );
                })}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
    </Segment>
  );
}
