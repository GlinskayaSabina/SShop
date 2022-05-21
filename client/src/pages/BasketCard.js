import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { Context } from "../index";
import { Button, Col, Row } from "react-bootstrap";
import OneItemInBasket from "../components/oneItemInBasket";

//import { ORDERING_ROUTE } from "../utils/consts";
import { NavLink } from "react-router-dom";

const BasketCard = observer(() => {
  const { basket } = useContext(Context);

  if (basket.Basket.length === 0) {
    return (
      <div className="d-flex flex-column align-items-center mt-5">
        <div className="text-center mt-5" style={{ fontSize: 28 }}>
          <b>Empty shopping basket</b>
        </div>
      </div>
    );
  }

  return (
    <>
      <br />
      {/* <NavLink to={ORDERING_ROUTE}>
        <Button>Checkout</Button>
      </NavLink> */}
      <Row className="mt-3">
        <Col xs={12}>
          {basket.Basket.map((item) => (
            <OneItemInBasket key={item.id} item={item} />
          ))}
        </Col>
      </Row>
      <Row className="mt-2 justify-content-center">
        <Button
          onClick={() => {
            basket.resetBasket();
          }}
        >
          Купить
        </Button>
      </Row>
    </>
  );
});

export default BasketCard;
