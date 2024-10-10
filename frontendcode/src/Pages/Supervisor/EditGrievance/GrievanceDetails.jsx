import React, { useState, useEffect } from 'react';
import './GrievanceDetails.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

function GrievanceDetails() {
  const { ticketNumber } = useParams();
  
  // Initialize grievanceDetails as null (object)
  const [grievanceDetails, setGrievanceDetails] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedAssignee, setSelectedAssignee] = useState('');
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    const fetchGrievance = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/grievances/${ticketNumber}`);
        console.log('Grievance API Response:', response.data); // Log response

        // Set grievanceDetails to the 'data' object from the response
        if (response.data && response.data.data) {
          setGrievanceDetails(response.data.data);
        } else {
          console.error('No grievance data found in the response.');
        }
      } catch (error) {
        console.error('Error fetching grievance data:', error);
      }
    };

    fetchGrievance();
  }, [ticketNumber]);

  useEffect(() => {
    const fetchAssignees = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/grievances/assignees');
        console.log('Assignees API Response:', response.data); // Inspect the structure

        let assigneesArray = [];

        if (Array.isArray(response.data)) {
          // Scenario 1: response.data is an array
          assigneesArray = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Scenario 2: response.data.data is the array
          assigneesArray = response.data.data;
        } else {
          console.error('Unexpected assignees response format:', response.data);
        }

        // Filter assignees with role 'ASSIGNEE'
        const filteredAssignees = assigneesArray.filter(assignee => assignee.role === 'ASSIGNEE');

        setAssignees(filteredAssignees);
      } catch (error) {
        console.error('Error fetching assignees:', error);
      }
    };

    fetchAssignees();
  }, []);

  const handleSubmit = async () => {
    try {
      // Update the assignee
      await axios.put(`http://localhost:8080/api/v1/grievances/${ticketNumber}/assign`, {
        assigneeId: selectedAssignee,
      });
      
      // Refresh the grievance details to reflect the updated assignee
      const response = await axios.get(`http://localhost:8080/api/v1/grievances/${ticketNumber}`);
      
      if (response.data && response.data.data) {
        setGrievanceDetails(response.data.data);
      } else {
        console.error('No grievance data found after update.');
      }
      
      console.log('Assignee updated successfully');
    } catch (error) {
      console.error('Error submitting grievance:', error);
    }

    try {
      
      await axios.put(`http://localhost:8080/api/v1/grievances/${ticketNumber}/status`, { status: 'INPROGRESS' });
  
      console.log(`Grievance ${ticketNumber} status changed to INPROGRESS`);
    } catch (error) {
      console.error('Error updating grievance status:', error);
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
            {/* Check if grievanceDetails is available */}
            {grievanceDetails ? (
              <>
                <div className="row_details">
                  <div className="name_details">
                    <div className="label_name">Name</div>
                    <div className="seperator_name">:</div>
                    <div className="value_name">{grievanceDetails.name}</div>
                  </div>
                  <div className="email_details">
                    <div className="label_email">Email</div>
                    <div className="seperator_email">:</div>
                    <div className="value_email">{grievanceDetails.email}</div>
                  </div>
                </div>
                <div className="row_details">
                  <div className="reason_details">
                    <div className="label_reason">Reason</div>
                    <div className="seperator_reason">:</div>
                    <div className="value_reason">{grievanceDetails.reason}</div>
                  </div>
                  <div className="description_details">
                    <div className="label_description">Description</div>
                    <div className="seperator_description">:</div>
                    <div className="value_description">{grievanceDetails.description}</div>
                  </div>
                </div>

                <div className="row_details">
                  <div className="phone_no_details">
                    <div className="label_phone_no">Phone No</div>
                    <div className="seperator_phone_no">:</div>
                    <div className="value_phone_no">{grievanceDetails.phoneNumber}</div>
                  </div>
                  <div className="address_details">
                    <div className="label_address">Address</div>
                    <div className="seperator_address">:</div>
                    <div className="value_address">{grievanceDetails.address}</div>
                  </div>
                </div>

                <div className="row_details">
                  <div className="invoice_date_details">
                    <div className="label_invoice_date">Invoice Date</div>
                    <div className="seperator_invoice_date">:</div>
                    <div className="value_invoice_date">{grievanceDetails.createdAt}</div>
                  </div>
                </div>

                <div className="row_details">
                  <div className="assignee_details">
                    <label className="label_assignee">Allot Assignee</label>
                    <select
                      className="input_assignee"
                      value={selectedAssignee}
                      onChange={(e) => setSelectedAssignee(e.target.value)}
                    >
                      <option value="">Select Assignee</option>
                      {assignees.map((assignee) => (
                        <option key={assignee.id} value={assignee.id}>
                          {assignee.name} - {assignee.department}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div>No grievance details found.</div>
            )}
            <div className="horizontal-line"></div>
          </div>

          <div className="buttons_assignee">
            <div className="submit_assignee">
              <Link to="/dashboard/supervisor">
                <button className="submit_button" type="button" onClick={handleSubmit}>
                  SUBMIT
                </button>
              </Link>
            </div>
            <div className="decline_assignee">
              <div>
                <div className={`app-container ${isPopupVisible ? 'blurred' : ''}`}>
                  <button className="decline" onClick={handleDecline}>
                    DECLINE
                  </button>
                  {isPopupVisible && (
                    <div className="popup-overlay" onClick={closePopup}>
                      <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <div className="delete-heading">ARE YOU SURE?</div>
                        <Link to="/dashboard/supervisor">
                          <button onClick={closePopup} className="decline_button_popup">
                            Decline
                          </button>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="close_supervisor">
              <Link to="/dashboard/supervisor">
                <button className="close_button" type="submit">
                  CLOSE
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GrievanceDetails;
