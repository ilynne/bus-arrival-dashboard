import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home';

import './styles/App.css';
import './styles/dashboard.scss';

function App() {
  return (
    <div className="App">
      <Home></Home>
    </div>
  );
}

export default App;
