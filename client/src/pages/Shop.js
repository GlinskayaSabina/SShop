import React, { useContext, useEffect } from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import ItemList from "../components/ItemList";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import { fetchBrands, fetchItems, fetchTypes } from "../http/itemAPI";
import Pages from "../components/Pages";
import { MyContext } from "../App";

const Shop = observer(() => {
  const { item } = useContext(Context);
  const { wsMessages } = useContext(MyContext);

  useEffect(() => {
    fetchTypes().then((data) => item.setTypes(data));
    fetchBrands().then((data) => item.setBrands(data));
    fetchItems(null, null, 1, 2).then((data) => {
      item.setItems(data.rows);
      item.setTotalCount(data.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetchItems(
      item.selectedType.id,
      item.selectedBrand.id,
      item.page,
      item.limit
    ).then((data) => {
      item.setItems(data.rows);
      item.setTotalCount(data.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.page, item.selectedType, item.selectedBrand]);
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <BrandBar />
          <ItemList />
          <Pages />
        </Col>
      </Row>
      <Row className="mt-2 d-flex flex-colum gap-3">
        {wsMessages &&
          wsMessages.length > 0 &&
          wsMessages.map((message) => <h4>{message}</h4>)}
      </Row>
    </Container>
  );
});

export default Shop;
