import React from "react";
import { Container, Card, ListGroup } from "react-bootstrap";

const ExpenseDisplay = (props) => {
  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Expense Details</Card.Title>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Name:</strong> {props.expenses.description}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> {props.expenses.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Category:</strong> {props.expenses.category}
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ExpenseDisplay;
