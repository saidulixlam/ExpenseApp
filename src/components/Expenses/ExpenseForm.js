import React, { useEffect, useRef, useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import ExpenseDisplay from './ExpenseDisplay';
import { useDispatch, useSelector } from 'react-redux';
import { expenseActions } from '../store/expensesSlice';
import axios from 'axios';
import Layout from '../store/Layout/Layout';
import { useHistory } from 'react-router-dom';


const ExpenseForm = () => {
  const dispatch = useDispatch();
  const expenseItems = useSelector((state) => state.expense.expenses);
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);

  let totalExpense = 0;
  expenseItems.forEach((item) => {
    totalExpense += Number(item.price);
  });

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const moneySpentRef = useRef();
  const expenseDescriptionRef = useRef();
  const expenseCategoryRef = useRef();

  const firebaseURL = 'https://expensetracker-d992e-default-rtdb.firebaseio.com';
  const endpoint = localStorage.getItem('endpoint');

  const history = useHistory();

  const clearInputFields = () => {
    moneySpentRef.current.value = '';
    expenseDescriptionRef.current.value = '';
    expenseCategoryRef.current.value = '';
  };

  const handlePremiumClick = () => {
    // Toggle the visibility of the premium component
    history.replace("/premium")

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

        dispatch(expenseActions.setExpenses(expenseArray));
      } else {
        console.log('No expense data found.');
      }
    } catch (err) {
      console.error('Error fetching expenses: ' + err.message);
    }
  };

  useEffect(() => {
    fetchExpense();
  }, []);

  const addItemHandler = async (e) => {
    e.preventDefault();
    const newExpense = {
      price: moneySpentRef.current.value,
      description: expenseDescriptionRef.current.value,
      category: expenseCategoryRef.current.value,
    };

    try {
      if (isEditing) {
        await axios.put(
          `${firebaseURL}/expenses/${endpoint}/${selectedExpense.key}.json`,
          newExpense
        );
        setIsEditing(false);

        // Dispatch the action to update expenseItems in Redux
        const updatedExpenses = expenseItems.map((item) =>
          item.key === selectedExpense.key ? { ...item, ...newExpense } : item
        );
        dispatch(expenseActions.setExpenses(updatedExpenses));
      } else {
        const res = await axios.post(
          `${firebaseURL}/expenses/${endpoint}.json`,
          newExpense
        );
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Something went wrong');
        }

        // Dispatch the action to update expenseItems in Redux
        dispatch(expenseActions.addExpense({ key: res.data.name, ...newExpense }));
      }

      clearInputFields();
      setShowForm(false);
    } catch (err) {
      alert('Error submitting the form: ' + err.message);
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

        // Dispatch the deleteExpense action to remove the expense from Redux store
        dispatch(expenseActions.deleteExpense(key));
      } else {
        throw new Error('Something went wrong while deleting the expense.');
      }
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  function convertDataToCSV(data) {
    // Implement the logic to format your data into a CSV string
    // Example: Convert an array of objects into a CSV string
    const csvRows = [];
    for (const item of data) {
      const values = Object.values(item);
      const row = values.map(value => `"${value}"`).join(",");
      csvRows.push(row);
    }
    return csvRows.join("\n");
  }
  const handleExportCSV = (e) => {
    e.preventDefault();

    const csvData = convertDataToCSV(expenseItems);
    // You can create a Blob or File object and trigger download
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
  }

  return (
    <Layout>
<Container className={`p-4 rounded my-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>

       <Container className={`p-4 rounded shadow-lg my-4 mx-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>

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
        <Container className={`p-3 rounded shadow-lg my-2 mx-4 ${isDarkMode ? 'bg-dark text-light' : 'bg-white text-dark'}`}>

          <ExpenseDisplay
            expenses={expenseItems}
            onDelete={deleteExpense}
            onEdit={editExpense}
            totalExpense={totalExpense}
          />
        </Container>
        <Container className="d-flex justify-content-between align-items-center mx-3">
          <a href="/your-csv-file.csv" className="btn btn-info" onClick={handleExportCSV}>
            Download Expenses</a>

          <Button
            variant="warning"
            className={`${totalExpense > 10000 ? 'animate-button' : ''}`}
            style={{
              transition: 'transform 0.3s ease',
              transform: totalExpense > 10000 ? 'scale(1.1)' : 'scale(1)',
            }}
            onClick={handlePremiumClick}
          >
            <span>Join Premium</span>
          </Button>
        </Container>
      </Container>
    </Layout>
  );
};

export default ExpenseForm;
