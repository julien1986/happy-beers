import React, { useContext } from "react";

//CONTEXT
import DataContext from "../context/DataContext";

//SEMANTIC UI
import { Container, Card, Icon } from "semantic-ui-react";

export default function CodeQR() {
  const { user } = useContext(DataContext);
  var QRCode = require("qrcode.react");

  return (
    <Container>
      <Card>
        <QRCode className="QRClient" renderAS="svg" value={new String(user.id)} />
        <Card.Content>
          <Card.Description>Montrez votre QR code au barman pour qu'il vous prépare votre commande </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <span>crédit disponible : {user.cagnote}</span>
          <Icon name="euro sign" />
        </Card.Content>
      </Card>
    </Container>
  );
}
