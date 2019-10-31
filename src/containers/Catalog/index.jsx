import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import CatalogItems from './components/CatalogItems';

const Catalog = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">Cartera de inversiones</h3>
        <h3 className="page-subhead subhead">Propiedades en su cartera
        </h3>
      </Col>
    </Row>
    <Row>
      <CatalogItems />
    </Row>
  </Container>
);

export default Catalog;
