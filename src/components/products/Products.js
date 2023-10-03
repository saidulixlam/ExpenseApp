import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Layout from '../store/Layout/Layout';

const Home = () => {
  return (
    <Layout>
      <Container className="my-5 p-3">
        <Row>
          <Col md={6} className="text-center">
            <h1 style={{ fontFamily: 'Arial, sans-serif' }}>
              Welcome to Expense Tracker
            </h1>
            <p style={{ fontFamily: 'Arial, sans-serif' }}>
              Keep track of your expenses with ease.
            </p>
          </Col>
          <Col md={6} className="text-center d-flex  justify-content-end">
            <Link to="/profile" className="info">
              Complete Profile
            </Link>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};



export default Home;
