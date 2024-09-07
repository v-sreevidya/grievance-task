import React, { useState, useEffect } from 'react';
import './GrievanceDetails.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function GrievanceDetails() {
  const { ticketNumber } = useParams();
  const [grievanceDetails, setGrievanceDetails] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');

  // Function to fetch grievance details
  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/grievances/${ticketNumber}`);
        setGrievanceDetails(response.data);
      } catch (error) {
        console.error('Error fetching grievance data:', error);
      }
    };

    fetchGrievance();
  }, [ticketNumber]);

  // Function to handle submission of selected assignee
  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/v1/grievances/${ticketNumber}/assign`, {
        assigneeId: selectedAssignee,
      });

      if (response.status === 200) {
        console.log('Assignee updated successfully');
      } else {
        throw new Error('Failed to update assignee');
      }
    } catch (error) {
      console.error('Error submitting grievance:', error);
    }
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleDecline = () => {
    setIsPopupVisible(true);
  };

  return (
    <div className="grievance_main">
      <div className="grievance_topsection">
        <div className="welcome_note">
          <div className="note1">Hi Supervisor,</div>
          <div className="note2">Welcome to GRWM Dashboard!</div>
        </div>

        <div className="list_container">
          <div className="title_bar">
            <div className="title">Grievance Details</div>
          </div>
          <div className="horizontal-line"></div>
          <div className="rows_details">
            {grievanceDetails && (
              <>
                <div className="row_details">
                  <div className="name_details">
                    <div className='label_name'>Name</div>
                    <div className="seperator_name">:</div>
                    <div className="value_name">{grievanceDetails.name}</div>
                  </div>
                  <div className="email_details">
                    <div className='label_email'>Email</div>
                    <div className="seperator_email">:</div>
                    <div className="value_email">{grievanceDetails.email}</div>
                  </div>
                </div>

                <div className="row_details">
                  <div className="reason_details">
                    <div className='label_reason'>Reason</div>
                    <div className="seperator_reason">:</div>
                    <div className="value_reason">{grievanceDetails.reason}</div>
                  </div>
                  <div className="description_details">
                    <div className='label_description'>Description</div>
                    <div className="seperator_description">:</div>
                    <div className="value_description">{grievanceDetails.description}</div>
                  </div>
                </div>
                <div className="row_details">
                <div className="invoice_date_details">
                  <div className='label_invoice_date'>Invoice Date</div>
                    <div className="seperator_invoice_date">:</div>
                    <div className="value_invoice_date">{grievanceDetails.createdAt}</div>
                </div>
              </div>
              

                <div className="row_details">
                  <div className="assignee_details">
                    <label className="label_assignee">Allot Assignee</label>
                    <select className='input_assignee' value={selectedAssignee} onChange={e => setSelectedAssignee(e.target.value)}>
                      <option value="0">Select Assignee</option>
                      <option value="1">ASSIGNEE-1</option>
                      <option value="2">ASSIGNEE-2</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="horizontal-line"></div>
          </div>

          <div className="buttons_assignee">
            <div className='submit_assignee'>
              <button className='submit_button' type="button" onClick={handleSubmit}>SUBMIT</button>
            </div>
            <div className='decline_assignee'>
              <div>
                <div className={`app-container ${isPopupVisible ? "blurred" : ""}`}>
                  <button className='decline' onClick={handleDecline}>DECLINE</button>
                  {isPopupVisible && (
                    <div className="popup-overlay" onClick={closePopup}>
                      <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <div className='delete-heading'>ARE YOU SURE ?</div>
                        <Link to="/dashboard/supervisor">
                          <button onClick={closePopup} className="decline_button_popup">Decline</button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrievanceDetails;
