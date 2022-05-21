import React, { useEffect, useState, useContext } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { Context } from "..";
import { addDeviceToBasket, fetchOneItem } from "../http/itemAPI";

const ItemPage = () => {
  const [item, setItem] = useState({ info: [] });
  const { user, basket } = useContext(Context);
  const { id } = useParams();
  useEffect(() => {
    fetchOneItem(id).then((data) => setItem(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const addDeviceInBasket = (item) => {
    if (user._IsAuth) {
      addDeviceToBasket(item).then(() => basket.setBasket(item, true));
    } else {
      basket.setBasket(item);
    }
  };
  const isDeviceInBasket = () => {
    const findDevice = basket.Basket.findIndex(
      (i) => Number(i.id) === Number(item.id)
    );
    return findDevice < 0;
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={4}>
          <Image
            width={300}
            height={300}
            src={"http://localhost:5000/" + item.img}
          />
        </Col>
        <Col md={4}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <h3>От: {item.price} руб.</h3>
            {isDeviceInBasket() ? (
              <Button
                variant="outline-dark"
                onClick={() => addDeviceInBasket(item)}
              >
                Добавить в карзину
              </Button>
            ) : (
              <Button variant="outline-dark" disabled>
                Продукт в карзине
              </Button>
            )}
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {item.info.map((info, index) => (
          <Row
            key={info.id}
            style={{
              background: index % 2 === 0 ? "lightgray" : "transparent",
              padding: 10,
            }}
          >
            {info.title}: {info.description}
          </Row>
        ))}
      </Row>
    </Container>
  );
};

export default ItemPage;
