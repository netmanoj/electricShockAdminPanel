import React, { useState } from 'react';
import './App.css';
import DataTable from './components/Datatable';
import Form from './components/Form';
import { useCsvData } from './cHooks/useCsvData';

function App() {
  const [showDetails, setShowDetails] = useState(false);
  const { handleSearch, handleDateFilter } = useCsvData();

  const toggleDetails = () => {
    setShowDetails(prevShowDetails => !prevShowDetails);
  };

  return (
    <div className="App">
      <header>
        <h2>Electric Shock </h2>
        {/* Main page section */}
        <section className="main-page">
          <h1>Welcome to the Electricity Connection Management System</h1>
          <p>
            This application helps you track and manage electricity connection requests. 
            You can search for requests, filter by date, and view detailed information 
            about each application.
          </p>
          <p>
            Use the button below to access the search form and data table.
          </p>
          <button onClick={toggleDetails} className="toggle-button">
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>
        </section>
      </header>
      {/* Conditionally render the search form and table based on the state */}
      {showDetails && (
        <>
          <Form handleDateFilter={handleDateFilter} handleSearch={handleSearch} />
          <DataTable />
        </>
      )}
    </div>
  );
}

export default App;
