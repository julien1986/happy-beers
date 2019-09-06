import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import uid from "uid";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { List, Segment, Input, Button } from "semantic-ui-react";

export default function Bieres() {
  const { user } = useContext(DataContext);
  const [listBeers, setListBeers] = useState([]);
  const [orders, setOrders] = useState([]);
  const urlPost = "http://localhost:8080/commandes";

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

  //DOIT VÉRIFIER CHAQUE ENTRÉE DANS LE CHAMP...
  const HandleChange = (beer, ev) => {
    checkStock(ev.currentTarget.value, beer.stock);
    //AJOUTE LA LISTE DES BIÈRES À LA COMMANDE, SI ON MODIFIE LE NOMBRE DE BIÈRE DÉSIRÉ, BOUCLE SUR L'ARRAY, TROUVE LA VALEUR EXISTANTE ET LA MODIFIE
    const nombre = ev.currentTarget.value;
    let found = false;
    const newOrder = orders.map(order => {
      if (order.id === beer.id) {
        found = true;
        return { ...order, quantity: nombre };
      } else {
        return order;
      }
    });
    if (!found) {
      setOrders([...orders, { id: beer.id, quantity: nombre }]);
    } else {
      setOrders([newOrder]);
    }
  };
  //...ET VÉRIFIER QUE C'EST DISPONIBLE DANS LE STOCK
  const checkStock = (nombre, currentstock) => {
    if (nombre > currentstock) {
      alert(`Vous ne pouvez en commander plus que ${currentstock}`);
    }
  };

  //AXIOS REQUEST POST BEER
  async function HandleCommand(url, orders) {
    const options = {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    };
    const order = {
      liste: orders,
      done: false,
      user: {
        id: user.id
      },
      num_commande: uid(4)
    };
    try {
      const response = await axios.post(url, order, options);
      //console.log(response);
    } catch (error) {
      //console.log(error);
    }
    //reset le state après que la requête soit effectuée
    setOrders([]);
  }

  console.log(orders);
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
      <Button
        primary
        onClick={() => {
          HandleCommand(urlPost, orders);
        }}
      >
        Valider la commande
      </Button>
    </Segment>
  );
}
