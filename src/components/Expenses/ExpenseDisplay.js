import React from "react";
import { Card, ListGroup, Row, Col, Button } from "react-bootstrap";
// import { FaEdit, FaTrash } from "react-icons"; // Import Font Awesome icons

const ExpenseDisplay = (props) => {

  function editHandler(key) {
    props.onEdit(key);
  }

  function deleteHandler(key) {
    props.onDelete(key);
  }

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
              <div className="mt-3 d-flex justify-content-between">
                {/* Edit Button */}
                <Button 
                variant="info" 
                className="mr-3 btn-sm"
                onClick={() => editHandler(item.key)}
                >
                  Edit
                </Button>
                {/* Delete Button */}
                <Button 
                variant="danger" 
                className="mr-3 btn-sm"
                onClick={() => deleteHandler(item.key)}
                >
                  Delete
                </Button>
              </div>

            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ExpenseDisplay;
