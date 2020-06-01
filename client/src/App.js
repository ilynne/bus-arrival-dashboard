import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Home from './Home';
import Dashboard from './Dashboard';

import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Bus arrival dashboard</h1>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
      </Router>
    </div>
  );
}

export default App;
