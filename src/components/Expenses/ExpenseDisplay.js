import React from "react";
import {  Card, ListGroup, Row, Col } from "react-bootstrap";

const ExpenseDisplay = (props) => {
  return (
    
      <Row>
        {props.expenses.map((item, index) => (
          <Col key={index} md={4}>
            <Card className="my-4 p-2 bg-light shadow rounded">
              <Card.Body className="bg-light shadow">
                <Card.Title>Expense Details</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Name:</strong> {item.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Price:</strong> {item.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Category:</strong> {item.category}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    )
};

export default ExpenseDisplay;
