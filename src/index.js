import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';

// bootstrap configuaration
// import '../node_modules/react-bootstrap/dist/react-bootstrap';
import '../node_modules/react-bootstrap/dist/react-bootstrap.min.js';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

 import { Provider } from 'react-redux'
import store from './components/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
    <Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
    </Provider>
    
);
