import './App.css'
import Table from './components/Table'
import React  from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Table />} />
      </Routes>
    </Router>
  );
}

export default App;