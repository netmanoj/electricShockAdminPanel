import React, { useState } from 'react';
import Form from './components/Form';
import DataTable from './components/Datatable';
import { useCsvData } from './cHooks/useCsvData';
import { Link } from 'react-router-dom';

function HomePage() {
  const [showDetails, setShowDetails] = useState(false); // State for data table visibility
  const { handleSearch, handleDateFilter } = useCsvData();

  const toggleDetails = () => {
    setShowDetails(prevShowDetails => !prevShowDetails);
  };

  return (
    <div className="HomePage">
      <header>
        <h2>Electric Shock ⚡</h2>
        {/* Main page section */}
        <section className="main-page">
          <h1>👋Welcome to the Electricity Connection Management System</h1>
          <p>
            This application helps you track and manage electricity connection requests. 
            You can search for requests, filter by date, and view detailed information 
            about each application.
          </p>
          <p>
            Use the button below to access the search form and data table and you can see the data Visualized⚡.
          </p>

     {  /*<button onClick={toggleDetails} className="toggle-button">
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>   */}
          <button className='toggle-button2'>
          <Link to="/data-table" className="visualize-link">Show Table 📋</Link>
          </button>
          <button className='toggle-button2'>
          <Link to="/chart-page" className="visualize-link">Visualize 📈</Link>
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

export default HomePage;
