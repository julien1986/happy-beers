import React, { useState, useContext, useEffect } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

//SEMANTIC UI
import { Card, Segment, Button, Icon, List } from "semantic-ui-react";
//CONTEXT
import DataContext from "../context/DataContext";

export default function QRreader(props) {
  const { user } = useContext(DataContext);
  const [customers, setCustomers] = useState();
  const [getQR, setQR] = useState({ resultat: "" });

  //AXIOS REQUEST GET USERS
  useEffect(() => {
    axios
      .get("http://localhost:8080/users", {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      })
      .then(response => {
        //console.log("Data: ", response.data);
        setCustomers(response.data);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
  }, []);

  const handleError = () => {
    alert("Code non valide");
  };
  const handleScan = data => {
    if (data) {
      console.log(data);
      setQR({ resultat: data });
    }
  };
  const HandleQR = () => {};
  return (
    <Card>
      <Segment>
        <Button content="scanner un code" onClick={HandleQR} />
        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
      </Segment>
      <h2>RESULTAT: {getQR.resultat}</h2>
    </Card>
  );
}
