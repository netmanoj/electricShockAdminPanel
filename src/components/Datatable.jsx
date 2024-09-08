import React from 'react';
import { MdEdit, MdSave } from 'react-icons/md';
import { GrView } from 'react-icons/gr';
import Popup from './Popup';
import useTable from '../cHooks/useTable'; // Import the custom hook
import { saveAs } from 'file-saver'; // You can use this to save the file
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const DataTable = () => {
  const {
    currentRows,
    totalPages,
    currentPage,
    handlePageChange,
    editRowIndex,
    editedRow,
    handleEditClick,
    handleSaveClick,
    handleChange,
    handlePopup,
    isShow,
  } = useTable();

  const navigate = useNavigate(); // Initialize useNavigate

  // Paging Range
  const pageRange = 20;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);

  // Function to export data to CSV
  const exportToCSV = () => {
    const headers = [
      'ID', 'Applicant ID', 'Applicant Name', 'Gender', 'Address',
      'GovtID Type', 'ID Number', 'Category', 'Load Applied (in KV)', 
      'Date of Application', 'Status', 'Reviewer ID', 'Reviewer Name'
    ];

    const rows = currentRows.map(row => ([
      row.ID,
      row.ID_Number,
      row.Applicant_Name,
      row.Gender,
      `${row.District} ${row.State}, ${row.Pincode}`,
      row.GovtID_Type,
      row.ID_Number,
      row.Category,
      row['Load_Applied (in KV)'],
      row.Date_of_Application,
      row.Status,
      row.Reviewer_ID,
      row.Reviewer_Name,
    ]));

    const csvContent = [headers, ...rows]
      .map(e => e.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'data.csv');
  };

  return (
    <div>
       <h2>Electric Shock ⚡</h2>
      {/* Button to navigate back to the homepage */}
      <button className='toggle-button2' onClick={() => navigate('/')}>
      ⬅️ Go Back
      </button>
      
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Applicant ID</th>
            <th>Applicant Name</th>
            <th>Gender</th>
            <th>Address</th>
            <th>GovtID Type</th>
            <th>ID Number</th>
            <th>Category</th>
            <th>Load Applied (in KV)</th>
            <th>Date of Application</th>
            <th>Status</th>
            <th>Reviewer ID</th>
            <th>Reviewer Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td>{row.ID}</td>
              <td>{row.ID_Number}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Applicant_Name}
                    onChange={(e) => handleChange(e, 'Applicant_Name')}
                  />
                ) : (
                  row.Applicant_Name
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Gender}
                    onChange={(e) => handleChange(e, 'Gender')}
                  />
                ) : (
                  row.Gender
                )}
              </td>
              <td className={editRowIndex === index ? 'edit' : 'address'}>
                {editRowIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedRow.District}
                      onChange={(e) => handleChange(e, 'District')}
                      placeholder="District"
                    />
                    <input
                      type="text"
                      value={editedRow.State}
                      onChange={(e) => handleChange(e, 'State')}
                      placeholder="State"
                    />
                    <input
                      type="text"
                      value={editedRow.Pincode}
                      onChange={(e) => handleChange(e, 'Pincode')}
                      placeholder="Pincode"
                    />
                  </>
                ) : (
                  `${row.District} ${row.State}, ${row.Pincode}`
                )}
              </td>
              <td>{row.GovtID_Type}</td>
              <td>{row.ID_Number}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Category}
                    onChange={(e) => handleChange(e, 'Category')}
                  />
                ) : (
                  row.Category
                )}
              </td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow['Load_Applied (in KV)']}
                    onChange={(e) => handleChange(e, 'Load_Applied (in KV)')}
                  />
                ) : (
                  row['Load_Applied (in KV)']
                )}
              </td>
              <td>{row.Date_of_Application}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Status}
                    onChange={(e) => handleChange(e, 'Status')}
                  />
                ) : (
                  row.Status
                )}
              </td>
              <td>{row.Reviewer_ID}</td>
              <td>
                {editRowIndex === index ? (
                  <input
                    type="text"
                    value={editedRow.Reviewer_Name}
                    onChange={(e) => handleChange(e, 'Reviewer_Name')}
                  />
                ) : (
                  row.Reviewer_Name
                )}
              </td>

              <td className="actions">
                {editRowIndex === index ? (
                  <span onClick={handleSaveClick}>
                    <MdSave />
                  </span>
                ) : (
                  <>
                    <span onClick={() => handleEditClick(index, row)}>
                      <MdEdit />
                    </span>
                    <span onClick={() => handlePopup(index)}>
                      <GrView />
                    </span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isShow && <Popup />}
      <div className='export-container'>
        <button className='export-btn' onClick={exportToCSV}>Export to CSV ⬇️</button>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'< '}Previous
        </button>
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{ fontWeight: currentPage === page ? 'bold' : 'normal' }}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next {' > '}
        </button>
      </div>
    </div>
  );
};

export default DataTable;
