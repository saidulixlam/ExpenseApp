import axios from 'axios';
import React, { useEffect, useRef, useState } from "react";
import { Container, Form, Button, Col, Row } from "react-bootstrap";
import ExpenseDisplay from "./ExpenseDisplay";

const ExpenseForm = () => {
    const moneySpentRef = useRef(null);
    const expenseDescriptionRef = useRef(null);
    const expenseCategoryRef = useRef(null);

    const [expenseItems, setExpenseItems] = useState([]);
    // Declare formData state
    const [formData, setFormData] = useState({
        price: "",
        description: "",
        category: "food", // Set a default category if needed
    });

    // State to control the visibility of the form
    const [showForm, setShowForm] = useState(false);

    // Define your Firebase URL or configuration
    const firebaseURL = 'https://expensetracker-d992e-default-rtdb.firebaseio.com';

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newExpense = {
            price: moneySpentRef.current.value,
            description: expenseDescriptionRef.current.value,
            category: expenseCategoryRef.current.value,
        };

        try {
            const res = await axios.post(`${firebaseURL}/expenses.json`, newExpense);
            if (res.status === 200 || res.status === 201) {
                console.log(res.data);
                fetchExpense();
            } else {
                throw new Error('Something went wrong');
            }
        } catch (err) {
            console.error(err.message);
            alert('Error submitting the form: ' + err.message);
        }
    };

    const fetchExpense = async () => {
        try {
            const res = await axios.get(`${firebaseURL}/expenses.json`);
            const expenseData = res.data;
            if (expenseData) {
                // Convert the object of objects into an array
                const expenseArray = Object.values(expenseData);
                setExpenseItems(expenseArray);
            } else {
                console.log('No expense data found.');
            }
        } catch (err) {
            console.error('Error fetching expenses: ' + err.message);
        }
    };

    // Fetch expenses on component mount
    useEffect(() => {
        fetchExpense();
    }, []);

    // Handle toggle form visibility
    const handleAddExpenseClick = () => {
        setShowForm(!showForm);
    };

    return (
        <Container className="my-4 mx-sm-4 mx-md-5 p-4 rounded">
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
                {showForm && (
                    <Form onSubmit={handleSubmit}>
                        <h2>Add an Expense</h2>
                        <Row>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="moneySpent">
                                    <Form.Label>Money Spent</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter amount"
                                        ref={moneySpentRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Describe the expense"
                                        ref={expenseDescriptionRef}
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control as="select" ref={expenseCategoryRef}>
                                        <option value="food">Food</option>
                                        <option value="petrol">Petrol</option>
                                        <option value="salary">Salary</option>
                                        <option value="travel">Travel</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="others">Others</option>
                                    </Form.Control>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Button
                            variant="primary"
                            type="submit"
                            className="w-100 my-2 rounded"
                        >
                            Add Expense
                        </Button>
                    </Form>
                )}
                <div className="text-center">
                    <Button
                        variant="secondary"
                        onClick={handleAddExpenseClick}
                        className="rounded"
                    >
                        {showForm ? "Cancel" : "Add New Expense"}
                    </Button>
                </div>
            </Container>
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
                <ExpenseDisplay expenses={expenseItems} />
            </Container>
        </Container>
    );
};

export default ExpenseForm;
