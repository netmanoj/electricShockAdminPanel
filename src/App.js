import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import HomePage from './HomePage'; // Import HomePage component
import DataTable from './components/Datatable';
import ConnectionChart from './components/ConnectionChart';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/data-table" element={<DataTable />} />
          <Route path="/chart-page" element={<ConnectionChart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

