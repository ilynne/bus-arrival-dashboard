import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PrivateRoute from './components/PrivateRoute';

import './styles/App.css';

function App() {
  return (
    <div className="App">
      <h1>Bus arrival dashboard</h1>
      <Router>
        <Route exact path="/" component={Home} exact />
        <PrivateRoute path="/dashboard" component={Dashboard} exact />
      </Router>
    </div>
  );
}

export default App;
