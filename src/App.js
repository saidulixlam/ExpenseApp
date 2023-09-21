import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/pages/Login';
import Products from './components/products/Products';
import NavBar from './components/Navbar/Navbar';
import Profile from './components/Profile/Profile';
import Forget from './components/pages/Forget';
import ExpenseForm from './components/Expenses/ExpenseForm';


const App = () => {

  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/products" exact><Products /></Route>
        <Route path="/login" ><Login /></Route>
        <Route path="/profile"><Profile /> </Route>
        <Route path="/forget"><Forget /></Route>
        <Route path="/expenses"><ExpenseForm /></Route>
      </Switch>
    </Router>
  );
};

export default App;
