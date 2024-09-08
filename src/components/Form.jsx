import React, { useContext } from 'react';
import { TableContext } from '../context/tableContext';
import { IoIosSearch } from 'react-icons/io';

const Form = ({ handleDateFilter, handleSearch }) => {
  const { searchQuery, setSearchQuery } = useContext(TableContext);
  return (
    <div className="form-container">
      <form onChange={handleSearch}>
        <label>Search by Applicant ID</label>
        <input
          type="text"
          placeholder="Search by Applicant Id"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <IoIosSearch />
      </form>
      {/* Date Picker for filtering by Date of Application */}
      <form className="calendar">
        <label>Search by Date of Application</label>
        <input type="date" onChange={(e) => handleDateFilter(e.target.value)} />
      </form>
    </div>
  );
};

export default Form;