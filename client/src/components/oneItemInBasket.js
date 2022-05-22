import React, { useContext } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { Context } from "../index";
import { NavLink } from "react-router-dom";

const OneItemInBasket = ({ item }) => {
  const { basket, user } = useContext(Context);

  return (
    <Card key={item.id} style={{ width: "100%" }} className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={4}>
            <Image
              src={"https://localhost:5000/" + item.img}
              style={{ width: "100%", maxWidth: 250 }}
            />
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12}>
                <b>Title:</b>{" "}
                <NavLink to={`/item/${item.id}`}>{item.name}</NavLink>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col xs={12}>
                <b>Description:</b>
                <br />
                <br />
                {item.info && item.info.length !== 0
                  ? item.info.map((info, i) => {
                      if (i % 2 === 0) {
                        return (
                          <Row key={info.id}>
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      } else {
                        return (
                          <Row
                            key={info.id}
                            style={{ backgroundColor: "lightgray" }}
                          >
                            <Col xs={6}>{info.title}</Col>
                            <Col xs={6}>{info.description}</Col>
                          </Row>
                        );
                      }
                    })
                  : "Description absent"}
              </Col>
            </Row>
          </Col>
          <Col xs={4}>
            <Row>
              <Col xs={12} className="d-flex justify-content-center">
                {user.isAuth ? (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(item, true)}
                  >
                    Удалить из карзины
                  </Button>
                ) : (
                  <Button
                    variant="outline-dark"
                    onClick={() => basket.setDeleteItemBasket(item)}
                  >
                    Удалить из карзины
                  </Button>
                )}
              </Col>
            </Row>
            <Row className="mt-5"></Row>
            <Row className="mt-5">
              <Col xs={12} className="d-flex justify-content-center">
                Price: {item.price * item.count} RUB
              </Col>
            </Row>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default OneItemInBasket;
