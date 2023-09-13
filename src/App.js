import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/pages/Login';
import Products from './components/products/Products';
import NavBar from './components/Navbar/Navbar';
import Profile from './components/pages/Profile';


const App = () => {

  return (
    <Router>
      <NavBar/>
      <Switch>
        <Route path="/products"><Products /></Route>
        <Route path="/login" exact><Login /></Route>
        <Route path="/profile"><Profile/> </Route>
      </Switch>
    </Router>
  );
};

export default App;
