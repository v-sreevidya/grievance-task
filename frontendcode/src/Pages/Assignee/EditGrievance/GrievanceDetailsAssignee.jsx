import React from 'react'
import { Link } from 'react-router-dom';
import './GrievanceDetailsAssignee.css'



function GrievanceDetailsAssignee() {

 

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
                <div className="row_details">
                  <div className="name_details">
                      <div className='label_name'>Name</div>
                      <div className="seperator_name">:</div>
                      <div className="value_name">USER</div>
                  </div>
                  <div className="email_details">
                      <div className='label_email'>Email</div>
                      <div className="seperator_email">:</div>
                      <div className="value_email">user@gmail.com</div>
                  </div>
                </div>
                <div className="row_details">
                  <div className="address_details">
                      <div className='label_address'>Address</div>
                      <div className="seperator_address">:</div>
                      <div className="value_address">address</div>
                  </div>
                  <div className="phone_no_details">
                      <div className='label_phone_no'>Phone Number</div>
                      <div className="seperator_phone_no">:</div>
                      <div className="value_phone_no">9876543210</div>
                  </div>
                </div>
                <div className="row_details">
                  <div className="reason_details">
                      <div className='label_reason'>Reason</div>
                      <div className="seperator_reason">:</div>
                      <div className="value_reason">Damaged Product</div>
                  </div>
                  <div className="description_details">
                      <div className='label_description'>Description</div>
                      <div className="seperator_description">:</div>
                      <div className="value_description">The spread operator is a convenient way to merge arrays or add elements to an array, ensuring immutability.</div>
                  </div>
                </div>
                <div className="row_details">
                  <div className="invoice_date_details">
                    <div className='label_invoice_date'>Invoice Date</div>
                      <div className="seperator_invoice_date">:</div>
                      <div className="value_invoice_date">03/09/2024</div>
                  </div>
                </div>
                <div className="row_details">
                  <div className="status_update">
                      <label className="label_status" >Update Status</label>
                          <select className='input_status' defaultValue="0">
                              <option value="0">Select Status</option>
                              <option value="RESOLVED">RESOLVED</option>
                              <option value="CLOSED">CLOSED</option>
                          </select>
                  </div>
                </div>
                <div className="horizontal-line"></div>
            
            </div>
              
  
              <div className="buttons_assignee">
                <div className='submit_assignee'>
                  <Link to ="/dashboard/assignee">
                    <button className='submit_button' type="submit">SUBMIT</button>
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
