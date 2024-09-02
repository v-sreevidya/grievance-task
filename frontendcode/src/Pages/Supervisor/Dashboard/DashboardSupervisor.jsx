import React, { useState } from 'react';
import './DashboardSupervisor.css'
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png'
import Resolved from '../../../Assets/icons/status/resolved.png'
import Closed from '../../../Assets/icons/status/closed.png'
import Delete from '../../../Assets/icons/status/delete.png'
import { Link } from 'react-router-dom';


const grievances = [
  { ticketNo: '123456', date: '2024-01-15', userid: '552361', assigneeid: '159863', category: '3', status: 'PENDING' },
  { ticketNo: '123457', date: '2024-01-16', userid: '910835', assigneeid: '369875', category: '2', status: 'OPEN' },
  { ticketNo: '123458', date: '2024-01-17', userid: '555883', assigneeid: '128796', category: '1', status: 'INPROGRESS' },
  { ticketNo: '123459', date: '2024-01-18', userid: '454679', assigneeid: '486259', category: '4', status: 'RESOLVED' },
  { ticketNo: '123460', date: '2024-01-19', userid: '166245', assigneeid: '854137', category: '5', status: 'CLOSED' },
  { ticketNo: '123434', date: '2024-01-15', userid: '166245', assigneeid: '124587', category: '2', status: 'PENDING' },
  { ticketNo: '123469', date: '2024-01-16', userid: '846592', assigneeid: '986574', category: '1', status: 'OPEN' },
  { ticketNo: '123478', date: '2024-01-17', userid: '714956', assigneeid: '789221', category: '6', status: 'CLOSED' },
 
];


const getStatusIcon = (status) => {
  switch(status) {
    case 'PENDING':
      return <img className="status_dot" src={Pending} alt="Pending" />;
    case 'OPEN':
      return <img className="status_dot" src={Open} alt="Open" />;
    case 'INPROGRESS':
      return <img className="status_dot" src={Inprogress} alt="In Progress" />;
    case 'RESOLVED':
      return <img className="status_dot" src={Resolved} alt="Resolved" />;
    case 'CLOSED':
      return <img className="status_dot" src={Closed} alt="Closed" />;
    case 'DELETE':
      return <img className="status_dot" src={Delete} alt="Closed" />;
    default:
      return null;
    
  }
};



function DashboardSupervisor() {

const [hoveredGrievance, setHoveredGrievance] = useState(null);
const [isPopupVisible,setIsPopupVisible]=useState(false);




const closePopup = () => {
  setIsPopupVisible(false);
};


const handleMouseEnter = (ticketNo) => {
  setHoveredGrievance(ticketNo);
};

const handleMouseLeave = () => {
  setHoveredGrievance(null);
};

const handleDelete = (ticketNo) => {
  setIsPopupVisible(true);
  console.log(`Deleting grievance with ticket number: ${ticketNo}`);

};

const handleEdit = (ticketNo) => {
  setIsPopupVisible(true);
  console.log(`Edit grievance with ticket number: ${ticketNo}`);
};


  return (
    <div className='grievance_main'>
      <div className="grievance_top">
        <div className='welcome_note'>
                <div className='note1'>Hi Supervisor,</div>
                <div className='note2'>Welcome to GRWM Dashboard!</div>
              </div>
              <div className="search">
              <form>
                <div>
                    <div className='form-search'>
                      <input className='search-input' type="search" id="search" name="search" placeholder="Search for Ticket No" />
                    </div> 
                </div> 
              </form>
        </div>

      </div>
      
      <div className='list_container'>
        <div className="title_bar">
          <div className='title'>Grievances</div>
        </div>
        <div class="horizontal-line"></div>
        <div>
            <tr className="menu_bar">
              <div>
                <th className="ticket_no_supervisor">
                  TICKET NO 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
              <div>
                <th className="date_supervisor">
                  DATE 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="user_id_supervisor">
                  USER ID
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="assignee_id_supervisor">
                  ASSIGNEE ID
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="category_supervisor">
                  CATEGORY
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="status_supervisor">
                  STATUS 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
          </tr>
          
          
        



        </div>
        <div class="horizontal-line2" ></div>
        <table className="grievance-table">
                

                  <tbody className="list">
                    {grievances.map((grievance, ticketNo) => (
                      <tr className='list_row' key={ticketNo}
                      onMouseEnter={() => handleMouseEnter(grievance.ticketNo)}
                      onMouseLeave={handleMouseLeave}
                      >
                        <div><td className='list_data_ticketNo_supervisor'>{grievance.ticketNo}</td></div>
                        <div><td className='list_data_date_supervisor'>{grievance.date}</td></div>
                        <div><td className='list_data_userid_supervisor'>{grievance.userid}</td></div>
                        <div><td className='list_data_assigneeid_supervisor'>{grievance.assigneeid}</td></div>
                        <div><td className='list_data_category_supervisor'>{grievance.category}</td></div>
                        <div>
                        <td className='list_data_status_supervisor'>
                          {hoveredGrievance === grievance.ticketNo ? (
                            grievance.status === 'CLOSED' ? (

                              <div className="delete">
                              <div className={`app-container ${isPopupVisible ? "blurred" : ""}`}>
                              <button className='delete_button' onClick={() => handleDelete(grievance.ticketNo)}>DELETE</button>
                              
                              {isPopupVisible && (
                                <div className="popup-overlay" onClick={closePopup}>
                                <div className="popup" onClick={(e) => e.stopPropagation()}>
                                    <div className='delete-heading'>DELETE?</div>
                                    <div className='delete-info'>Are you sure to Delete Ticket no <span className='tckt'>{grievance.ticketNo} </span>.</div>
                                    <Link to ="/dashboard/supervisor">
                                    <button onClick={closePopup} className="delete_button_popup">Done</button>
                                    </Link>
                                </div>
                                    </div>
                                    
                              )}
                              </div>

                              </div>
                            ) : hoveredGrievance === grievance.ticketNo && grievance.status === 'PENDING' ? (
                              <Link to ="/dashboard/supervisor/edit">
                              <button className='edit_button' onClick={() => handleEdit(grievance.ticketNo)}>EDIT</button>
                              </Link>
                            ) : (
                              <>
                                <span className='list_data_status_icon'>{getStatusIcon(grievance.status)}</span>
                                <span>{grievance.status}</span>
                              </>
                            )
                          ) : (
                            <>
                              <span className='list_data_status_icon'>{getStatusIcon(grievance.status)}</span>
                              <span>{grievance.status}</span>
                            </>
                          )}
                        </td>

                        </div>

                      </tr>
                    ))}
                  </tbody>






        </table> 
        <div class="horizontal-line3" ></div>
        <div className="pagination">
          <button 
            className="pagination-button">
            &lt;
          </button>
          <span className="pagination-info">1</span>
          <button 
            className="pagination-button">
            &gt;
          </button>
        </div>
      </div>
      
    </div>
  )
}

export default DashboardSupervisor
