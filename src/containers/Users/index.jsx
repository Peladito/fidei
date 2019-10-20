import React from 'react';
import { Container, Row } from 'reactstrap';
import UsersCard from './components/UsersCard';

const ExamplePage = () => (
  <Container className="dashboard">
    <Row>
      <UsersCard />
    </Row>
  </Container>
);

export default ExamplePage;
