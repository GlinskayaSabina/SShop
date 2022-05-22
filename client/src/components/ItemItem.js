import React from "react";
import { Card, Col } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { ITEM_ROUTE } from "../utils/consts";

const ItemItem = ({ item }) => {
  const history = useHistory();
  return (
    <Col
      md={3}
      className={"mt-3"}
      onClick={() => history.push(ITEM_ROUTE + "/" + item.id)}
    >
      <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
        <Image
          width={150}
          height={150}
          src={"https://localhost:5000/" + item.img}
        />
        <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
          {/* <div>Samsung...</div> */}
          <div className="d-flex align-items-center"></div>
        </div>
        <div>{item.name}</div>
      </Card>
    </Col>
  );
};

export default ItemItem;
