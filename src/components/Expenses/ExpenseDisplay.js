import React, { useState, useEffect } from "react";
import { Card, ListGroup, Row, Col, Button, Spinner } from "react-bootstrap";

const ExpenseDisplay = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  function editHandler(key) {
    props.onEdit(key);
  }

  function deleteHandler(key) {
    props.onDelete(key);
  }

  return (
    <Row>
      <h3 className="text-center my-2 mx-">Expense details</h3>

      {loading ? (
        <Col className="text-center">
          <Spinner animation="border" role="status">
            <span className="sr-only"></span>
          </Spinner>
          <p>Loading expenses...</p>
        </Col>
      ) : (
        props.expenses.map((item, index) => (
          <Col key={index} md={4} sm={6} xs={12} className="mb-3">
            {/* Use md={4} for medium screens, sm={6} for small screens, and xs={12} for extra small screens */}
            <Card className="p-1 bg-light shadow rounded h-100 d-flex flex-column">
              {/* Add 'h-100' class to make all cards the same height and 'd-flex flex-column' to make it a flex container */}
              <Card.Body className="bg-light shadow flex-grow-1">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <strong>Details:</strong> {item.description}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Price:</strong> {item.price}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <strong>Category:</strong> {item.category}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <div className="mt-auto mb-1 d-flex gap-2 justify-content-end bg-light">
                {/* Edit Button */}
                <Button
                  variant="info"
                  className="btn-sm"
                  onClick={() => editHandler(item.key)}
                >
                  Edit
                </Button>
                {/* Delete Button */}
                <Button
                  variant="danger"
                  className="btn-sm ml-2"
                  onClick={() => deleteHandler(item.key)}
                >
                  Delete
                </Button>
              </div>
            </Card>
          </Col>
        ))
      )}
    </Row>
    
  );
};

export default ExpenseDisplay;
