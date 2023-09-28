import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import ExpenseDisplay from './ExpenseDisplay';

const ExpenseForm = () => {
  const [expenseItems, setExpenseItems] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const moneySpentRef = useRef(null);
  const expenseDescriptionRef = useRef(null);
  const expenseCategoryRef = useRef(null);

  const firebaseURL = 'https://expensetracker-d992e-default-rtdb.firebaseio.com';
  const endpoint = localStorage.getItem('endpoint');

  const clearInputFields = () => {
    if (moneySpentRef.current) moneySpentRef.current.value = '';
    if (expenseDescriptionRef.current) expenseDescriptionRef.current.value = '';
    if (expenseCategoryRef.current) expenseCategoryRef.current.value = '';
  };

  const addItemHandler = async (e) => {
    e.preventDefault();
    const newExpense = {
      price: moneySpentRef.current ? moneySpentRef.current.value : '',
      description: expenseDescriptionRef.current ? expenseDescriptionRef.current.value : '',
      category: expenseCategoryRef.current ? expenseCategoryRef.current.value : '',
    };

    try {
      if (isEditing) {
        await axios.put(
          `${firebaseURL}/expenses/${endpoint}/${selectedExpense.key}.json`,
          newExpense
        );
        setIsEditing(false);
      } else {
        const res = await axios.post(
          `${firebaseURL}/expenses/${endpoint}.json`,
          newExpense
        );
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Something went wrong');
        }
      }

      clearInputFields();
      setShowForm(false);
      fetchExpense();
    } catch (err) {
      alert('Error submitting the form: ' + err.message);
    }
  };

  const fetchExpense = async () => {
    try {
      const res = await axios.get(`${firebaseURL}/expenses/${endpoint}.json`);
      const expenseData = res.data;
      if (expenseData) {
        const expenseArray = Object.keys(expenseData).map((key) => ({
          key,
          ...expenseData[key],
        }));

        setExpenseItems(expenseArray);
      } else {
        console.log('No expense data found.');
      }
    } catch (err) {
      console.error('Error fetching expenses: ' + err.message);
    }
  };

  const handleAddExpenseClick = () => {
    setShowForm(!showForm);

    if (isEditing) {
      setIsEditing(false);
      setSelectedExpense(null);
    }
  };

  const editExpense = (key) => {
    setIsEditing(true);
    const expenseToEdit = expenseItems.find((item) => item.key === key);

    if (expenseToEdit) {
      setSelectedExpense(expenseToEdit);
      setShowForm(true);
    }
  };

  useEffect(() => {
    if (selectedExpense) {
      if (moneySpentRef.current) {
        moneySpentRef.current.value = selectedExpense.price;
      }

      if (expenseDescriptionRef.current) {
        expenseDescriptionRef.current.value = selectedExpense.description;
      }

      if (expenseCategoryRef.current) {
        expenseCategoryRef.current.value = selectedExpense.category;
      }
    }
  }, [selectedExpense]);

  const deleteExpense = async (key) => {
    try {
      const response = await axios.delete(
        `${firebaseURL}/expenses/${endpoint}/${key}.json`
      );
      if (response.status === 200) {
        console.log('Expense deleted successfully:', response.data);
        const newExpense = expenseItems.filter((item) => item.key !== key);
        setExpenseItems(newExpense);
      } else {
        throw new Error('Something went wrong while deleting the expense.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  useEffect(() => {
    if (!showForm) {
      setSelectedExpense(null);
    }
  }, [showForm]);

    return (
        <Container className="my-4 mx-sm-4 mx-md-5 p-4 rounded">
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
                {showForm && (
                    <Form onSubmit={addItemHandler}>
                        <h2>{isEditing ? 'Edit Expense' : 'Add an Expense'}</h2>
                        <Row>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="moneySpent">
                                    <Form.Label>Money Spent</Form.Label>
                                    <Form.Control
                                        ref={moneySpentRef}
                                        required
                                        type="text"
                                        placeholder="Enter amount"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        ref={expenseDescriptionRef}
                                        required
                                        type="text"
                                        placeholder="Describe the expense"
                                    />
                                </Form.Group>
                            </Col>
                            <Col xs={12} sm={6} md={4}>
                                <Form.Group controlId="expenseCategory">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        ref={expenseCategoryRef}
                                        as="select"
                                        required
                                    >
                                        <option value="petrol">Petrol</option>
                                        <option value="salary">Salary</option>
                                        <option value="travel">Travel</option>
                                        <option value="shopping">Shopping</option>
                                        <option value="food">Food</option>
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
                            {isEditing ? 'Update Expense' : 'Add Expense'}
                        </Button>
                    </Form>
                )}
                <div className="text-center">
                    <Button
                        variant="secondary"
                        onClick={handleAddExpenseClick}
                        className="rounded"
                    >
                        {showForm ? 'Cancel' : 'Add New Expense'}
                    </Button>
                </div>
            </Container>
            <Container className="bg-white p-4 rounded shadow-lg my-4 mx-4">
                <ExpenseDisplay
                    expenses={expenseItems}
                    onDelete={deleteExpense}
                    onEdit={editExpense}
                />
            </Container>
        </Container>
    );
};

export default ExpenseForm;
