import React, { useState, useEffect } from 'react';
import './DashboardSupervisor.css';
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png';
import Resolved from '../../../Assets/icons/status/resolved.png';
import Closed from '../../../Assets/icons/status/closed.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

const getStatusIcon = (status) => {
  switch (status) {
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
    default:
      return null;
  }
};

function DashboardSupervisor() {
  const [grievances, setGrievances] = useState([]);
  const [sortedGrievances, setSortedGrievances] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredGrievance, setHoveredGrievance] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/grievances");
        setGrievances(response.data);
        setSortedGrievances(response.data);
      } catch (error) {
        console.error('Error fetching grievances:', error);
      }
    };

    fetchGrievances();
  }, []);

  const sortGrievances = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedArray = [...sortedGrievances].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setSortedGrievances(sortedArray);
    setSortConfig({ key, direction });
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  const handleMouseEnter = (ticketNumber) => {
    setHoveredGrievance(ticketNumber);
  };

  const handleMouseLeave = () => {
    setHoveredGrievance(null);
  };

  const handleDelete = (ticketNumber) => {
    setIsPopupVisible(true);
    console.log(`Deleting grievance with ticket number: ${ticketNumber}`);
  };
  const handleEdit = async (ticketNumber) => {
    try {
      // Send PUT request to update the status to "OPEN"
      await axios.put(`http://localhost:8080/api/v1/grievances/${ticketNumber}/status`, { status: 'OPEN' });
  
      // Fetch the updated grievances after status change
      const response = await axios.get("http://localhost:8080/api/v1/grievances");
      setGrievances(response.data);
      setSortedGrievances(response.data);
      console.log(`Grievance ${ticketNumber} status changed to OPEN`);
    } catch (error) {
      console.error('Error updating grievance status:', error);
    }
  };
  
  

  // const handleEdit = (ticketNumber) => {
  //   // Navigate to grievance details page for editing
    
  //   console.log(`Edit grievance with ticket number: ${ticketNumber}`);
  // };
  

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredGrievances = grievances.filter((grievance) =>
      grievance.ticketNumber.toString().includes(value)
    );

    setSortedGrievances(filteredGrievances);
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
            <div className='form-search'>
              <input
                className='search-input'
                type="search"
                id="search"
                name="search"
                placeholder="Search for Ticket No"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>
      </div>

      <div className='list_container_supervisor'>
        <div className="title_bar">
          <div className='title'>Grievances</div>
        </div>
        <div className="horizontal-line"></div>
        <div>
          <tr className="menu_bar">
            <div>
              <th className="ticket_no_supervisor" onClick={() => sortGrievances('ticketNumber')}>
                TICKET NO
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="date_supervisor" onClick={() => sortGrievances('date')}>
                DATE
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="user_id_supervisor" onClick={() => sortGrievances('userid')}>
                USER NAME
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="assignee_id_supervisor" onClick={() => sortGrievances('assigneeid')}>
                ASSIGNEE ID
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="category_supervisor" onClick={() => sortGrievances('category')}>
                CATEGORY
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="status_supervisor" onClick={() => sortGrievances('status')}>
                STATUS
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
          </tr>
        </div>
        <div className="horizontal-line2"></div>
        <table className="grievance-table">
          <tbody className="list">
            {sortedGrievances.map((grievance) => (
              <tr
                className='list_row'
                key={grievance.ticketNumber}
                onMouseEnter={() => handleMouseEnter(grievance.ticketNumber)}
                onMouseLeave={handleMouseLeave}
              >
                <td className='list_data_ticketNo_supervisor'>{grievance.ticketNumber}</td>
                <td className='list_data_date_supervisor'>{grievance.createdAt}</td>
                <td className='list_data_userid_supervisor'>{grievance.name}</td>
                <td className='list_data_assigneeid_supervisor'>{grievance.assigneeid}</td>
                <td className='list_data_category_supervisor'>{grievance.reason}</td>
                <td className='list_data_status_supervisor'>
                  {hoveredGrievance === grievance.ticketNumber ? (
                    grievance.status === 'CLOSED' ? (
                      <div className="delete">
                        <div className={`app-container ${isPopupVisible ? "blurred" : ""}`}>
                          <button className='delete_button' onClick={() => handleDelete(grievance.ticketNumber)}>DELETE</button>
                          {isPopupVisible && (
                            <div className="popup-overlay" onClick={closePopup}>
                              <div className="popup" onClick={(e) => e.stopPropagation()}>
                                <div className='delete-heading'>DELETE?</div>
                                <div className='delete-info'>Are you sure to Delete Ticket no <span className='tckt'>{grievance.ticketNumber}</span>?</div>
                                <Link to="/dashboard/supervisor">
                                  <button onClick={closePopup} className="delete_button_popup">Done</button>
                                </Link>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : hoveredGrievance === grievance.ticketNumber && grievance.status === 'PENDING' ? (
                      <Link to={`/dashboard/supervisor/edit/${grievance.ticketNumber}`}>
                        <button className='edit_button' onClick={() => handleEdit(grievance.ticketNumber)}>EDIT</button>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardSupervisor;
