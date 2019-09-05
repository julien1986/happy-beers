import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { List, Segment, Input, Button } from "semantic-ui-react";

export default function Bieres() {
  const { user } = useContext(DataContext);
  const [listBeers, setListBeers] = useState([]);
  const [total, setTotal] = useState([]);
  const token = user.token;

  //AXIOS REQUEST
  useEffect(() => {
    axios
      .get("http://localhost:8080/products", {
        headers: {
          Authorization: `Bearer ${token}`
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

  console.log(total);
  //DOIT VÉRIFIER CHAQUE ENTRÉE DANS LE CHAMP...
  const HandleChange = (beer, ev) => {
    checkStock(ev.currentTarget.value, beer.stock);
    setTotal([...total, { id: beer.id, quantite: ev.currentTarget.value }]);
  };
  //...ET VÉRIFIER QUE C'EST DISPONIBLE DANS LE STOCK
  const checkStock = (nombre, currentstock) => {
    if (nombre > currentstock) {
      alert(`Vous ne pouvez en commander plus que ${currentstock}`);
    }
  };

  //DOIT ENVOYER LA COMMANDE DANS LA DB
  const HandleCommand = () => {};

  return (
    <Segment inverted>
      <List divided inverted relaxed>
        {listBeers.map(beer => (
          <List.Item key={beer.id}>
            <List.Content>
              <List.Header>{beer.name}</List.Header>
              <div>
                <strong>{beer.brasserie}</strong> | <strong>origine:</strong> {beer.origine} | <strong>nombre désiré:</strong> <Input type="number" placeholder="rentrer un nombre" onChange={ev => HandleChange(beer, ev)} />
              </div>
              <div>
                <strong>Taux d'alccol: </strong> {beer.taux_alcool} | <strong>prix: </strong>
                {beer.prix}€
              </div>
            </List.Content>
          </List.Item>
        ))}
      </List>
      <Button primary onChange={HandleCommand}>
        Valider la commande
      </Button>
    </Segment>
  );
}
