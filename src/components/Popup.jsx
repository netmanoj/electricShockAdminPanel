import React, { useContext } from 'react';
import { TableContext } from '../context/tableContext';

const Popup = () => {
  const { csvData, clickedId, setIsShow } = useContext(TableContext);

  return (
    <div class="overlay" onClick={() => setIsShow(false)}>
      <div class="popup" onClick={(e) => e.stopPropagation()}>
        <span class="popup-close" onClick={() => setIsShow(false)}>
          &times;
        </span>
        <h3>Client Details</h3>
        {csvData
          .filter((row) => parseInt(row.ID) === clickedId + 1)
          .map((row) => {
            return (
              <div>
                <div className="container">
                  <h4>Applicant Personal Info:</h4>
                  <div>
                    <p>
                      <span> Applicant ID:</span>
                      <span> {row.ID}</span>
                    </p>
                    <p>
                      <span>Applicant Name:</span>
                      <span> {row.Applicant_Name}</span>
                    </p>
                    <p>
                      <span>Applicant Gender: </span>
                      <span>{row.Gender}</span>
                    </p>
                    <p>
                      <span>Applicant Category: </span>
                      <span>{row.Category}</span>
                    </p>
                    <p>
                      <span>Applicant Address:</span>
                      <span>
                        {' '}
                        {row.District}, {row.State},{row.Pincode}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="container">
                  <h4>Application Other Details</h4>
                  <div>
                    <p>
                      <span>Applicant Ownership: </span>
                      <span>{row.Ownership}</span>
                    </p>
                    <p>
                      <span>GovtID Type </span>
                      <span>{row.GovtID_Type}</span>
                    </p>
                    <p>
                      <span>ID Number </span>
                      <span>{row.ID_Number}</span>
                    </p>
                    <p>
                      <span>Load Applied (in KV): </span>
                      <span>{row['Load_Applied (in KV)']}</span>
                    </p>
                    <p>
                      <span>Date of Application: </span>
                      <span>{row.Date_of_Application}</span>
                    </p>
                    <p>
                      <span>Date of Approval: </span>
                      <span>
                        {row.Date_of_Approval ? row.Date_of_Approval : 'NA'}
                      </span>
                    </p>
                    <p>
                      <span>Modified Date: </span>
                      <span>{row.Modified_Date}</span>
                    </p>
                    <p>
                      <span>Status: </span>
                      <span>{row.Status}</span>
                    </p>
                  </div>
                </div>
                <div className="container">
                  <h4>Review</h4>
                  <div>
                    <p>
                      <span>Reviewer ID: </span>
                      <span> {row.Reviewer_ID}</span>
                    </p>
                    <p>
                      <span>Reviewer Name:</span>
                      <span> {row.Reviewer_Name} </span>
                    </p>
                    <p>
                      <span>Reviewer Comments:</span>
                      <span> {row.Reviewer_Comments}</span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Popup;
