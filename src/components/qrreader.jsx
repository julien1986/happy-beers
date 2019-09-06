import React, { useState, useContext, useEffect } from "react";
import QrReader from "react-qr-reader";
import axios from "axios";

//SEMANTIC UI
import { Segment, Card } from "semantic-ui-react";
//CONTEXT
import DataContext from "../context/DataContext";

export default function QRreader(props) {
  return (
    <Card>
      <Segment></Segment>
    </Card>
  );
}
