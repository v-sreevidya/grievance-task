import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './GrievanceDetailsAssignee.css'
import axios from 'axios';


function GrievanceDetailsAssignee() {

  const { ticketNumber } = useParams();
  const [grievanceDetails, setGrievanceDetails] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

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

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      // Send PUT request to update the status
      await axios.put(`http://localhost:8080/api/v1/grievances/${ticketNumber}/status`, { status: selectedStatus });

      console.log(`Grievance ${ticketNumber} status changed to ${selectedStatus}`);
    } catch (error) {
      console.error('Error updating grievance status:', error);
    }
  };

    return (
        <div className="grievance_main">
        <div className="grievance_topsection">
          <div className="welcome_note">
            <div className="note1">Hi Assignee,</div>
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
                  <div className="phone_no_details">
                      <div className='label_phone_no'>Phone No</div>
                      <div className="seperator_phone_no">:</div>
                      <div className="value_phone_no">{grievanceDetails.phoneNumber}</div>
                  </div>
                  <div className="address_details">
                      <div className='label_address'>Address</div>
                      <div className="seperator_address">:</div>
                      <div className="value_address">{grievanceDetails.address}</div>
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
                  <div className="status_update">
                      <label className="label_status" >Update Status</label>
                      <select className='input_status' value={selectedStatus} onChange={handleStatusChange}>
                              <option value="0">Select Status</option>
                              <option value="RESOLVED">RESOLVED</option>
                          </select>
                  </div>
                </div>
                </>
            )}
                <div className="horizontal-line"></div>
            
            </div>
              
  
              <div className="buttons_assignee">
                <div className='submit_assignee'>
                  <Link to ="/dashboard/assignee">
                    <button className='submit_button' type="submit"  onClick={handleSubmit}>SUBMIT</button>
                  </Link>
                </div>
                <div className='close_assignee'>
                  <Link to ="/dashboard/assignee">
                    <button className='close_button' type="submit">CLOSE</button>
                  </Link>
                </div>
              </div>
              
          </div>
        </div>
      </div>
    )
  }


export default GrievanceDetailsAssignee
