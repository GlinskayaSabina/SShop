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

const Shop = observer(() => {
  const { item } = useContext(Context);

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
    fetchItems(item.selectedType.id, item.selectedBrand.id, item.page, 2).then(
      (data) => {
        item.setItems(data.rows);
        item.setTotalCount(data.count);
      }
    );
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
    </Container>
  );
});

export default Shop;
