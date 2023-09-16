import React, { useRef, useState } from "react";
import { Container, Form, Button, Col } from "react-bootstrap";
import ExpenseDisplay from "./ExpenseDisplay";

const ExpenseForm = () => {
    const moneySpentRef = useRef(null);
    const expenseDescriptionRef = useRef(null);
    const expenseCategoryRef = useRef(null);

    // Declare formData state
    const [formData, setFormData] = useState({
        price: "",
        description: "",
        category: "food", // Set a default category if needed
    });

    // State to control the visibility of the form
    const [showForm, setShowForm] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Update formData state with the values from refs
        setFormData({
            price: moneySpentRef.current.value,
            description: expenseDescriptionRef.current.value,
            category: expenseCategoryRef.current.value,
        });
    };

    const handleAddExpenseClick = () => {
        setShowForm(!showForm); // Toggle the visibility of the form
    };

    return (
        <Container className="my-5 mx-5 bg-white p-4 rounded">
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">

                {showForm && (
                    <Form onSubmit={handleSubmit}>
                        <h2>Add an Expense</h2>
                        <Form>
                            <Form.Group as={Col} controlId="moneySpent">
                                <Form.Label>Money Spent</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter amount"
                                    ref={moneySpentRef}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="expenseDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Describe the expense"
                                    ref={expenseDescriptionRef}
                                />
                            </Form.Group>
                        </Form>

                        <Form.Group controlId="expenseCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control as="select" ref={expenseCategoryRef}>
                                <option value="food">Food</option>
                                <option value="petrol">Petrol</option>
                                <option value="salary">Salary</option>
                                <option value="travel">Travel</option>
                                <option value="shopping">Shopping</option>
                                <option value="others">Others</option>
                                {/* Add more category options as needed */}
                            </Form.Control>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 my-2 rounded d-flex justify-content-center"
                        >
                            Add Expense
                        </Button>

                    </Form>
                )}
                <div className="text-center">
                    <Button
                        variant="secondary"
                        onClick={handleAddExpenseClick}
                        className="my-2 rounded"
                    >
                        {showForm ? "Cancel" : "Add New Expense"}
                    </Button>
                </div>

            </Container>
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
                <ExpenseDisplay expenses={formData} />
            </Container>
        </Container>
    );
};

export default ExpenseForm;
