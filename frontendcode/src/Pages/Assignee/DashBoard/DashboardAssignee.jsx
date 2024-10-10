import React, { useState, useEffect } from 'react';
import './DashboardAssignee.css';
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png';
import Resolved from '../../../Assets/icons/status/resolved.png';
import Closed from '../../../Assets/icons/status/closed.png';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
    default:
      return null;
  }
};

function DashboardAssignee(){
  
  const [grievances, setGrievances] = useState([]);
  const [sortedGrievances, setSortedGrievances] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredGrievance, setHoveredGrievance] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null); // Added error state
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/v1/grievances");
        console.log('Grievances API Response:', response.data); // Log the response for debugging

        let grievancesArray = [];

        if (Array.isArray(response.data)) {
          // Scenario 1: response.data is directly an array
          grievancesArray = response.data;
        } else if (response.data && Array.isArray(response.data.data)) {
          // Scenario 2: response.data.data is the array
          grievancesArray = response.data.data;
        } else {
          console.error('Expected an array of grievances:', response.data);
          setError('Unexpected response format for grievances.');
          setIsLoading(false);
          return; // Exit early since the data format is unexpected
        }

        setGrievances(grievancesArray);
        setSortedGrievances(grievancesArray);
      } catch (error) {
        console.error('Error fetching grievances:', error);
        setError('Failed to fetch grievances.');
      } finally {
        setIsLoading(false);
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

  const handleMouseEnter = (ticketNumber) => {
    setHoveredGrievance(ticketNumber);
  };

  const handleMouseLeave = () => {
    setHoveredGrievance(null);
  };

  const handleEdit = (ticketNumber) => {
    console.log(`Edit grievance with ticket number: ${ticketNumber}`);
  };

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
          <div className='note1'>Hi Assignee,</div>
          <div className='note2'>Welcome to GRWM Dashboard!</div>
        </div>
        <div className="search">
          <form>
            <div>
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
            </div> 
          </form>
        </div>
      </div>
      <div className='list_container_assignee'>
        <div className="title_bar">
          <div className='title'>Grievances</div>
        </div>
        <div class="horizontal-line"></div>
        <div>
            <tr className="menu_bar">
              <div>
                <th className="ticket_no_assignee" onClick={() => sortGrievances('ticketNumber')}>
                  TICKET NO 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
              <div>
                <th className="date_assignee" onClick={() => sortGrievances('date')}>
                  DATE 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="user_id_assignee" onClick={() => sortGrievances('userid')}>
                  USER NAME
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="category_assignee" onClick={() => sortGrievances('category')}>
                  CATEGORY
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>

              <div>
                <th className="status_assignee" onClick={() => sortGrievances('status')}>
                  STATUS 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
          </tr>

        </div>
        <div className="horizontal-line2"></div>
        <div className="grievance-table-container">
          {isLoading ? (
            <div>Loading grievances...</div>
          ) : error ? (
            <div className="error-message">{error}</div>
          ) : (
            <table className="grievance-table">
              <tbody className="list">
                {sortedGrievances.map((grievance) => (
                  <tr
                    className='list_row'
                    key={grievance.ticketNumber}
                    onMouseEnter={() => handleMouseEnter(grievance.ticketNumber)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className='list_data_ticketNumber_assignee'>{grievance.ticketNumber}</td>
                    <td className='list_data_date_assignee'>{grievance.createdAt}</td>
                    <td className='list_data_userid_assignee'>{grievance.name}</td>
                    <td className='list_data_category_assignee'>{grievance.reason}</td>
                    <td className='list_data_status_assignee'>
                      {hoveredGrievance === grievance.ticketNumber ? (
                        grievance.status === 'INPROGRESS' ? (
                          <Link to={`/dashboard/assignee/edit/${grievance.ticketNumber}`}>
                            <button
                              className='edit_button_assignee'
                              onClick={() => handleEdit(grievance.ticketNumber)}
                            >
                              EDIT
                            </button>
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
          )}
        </div>
        <div className='bottom_section'>
          <div className="horizontal-line3"></div>
          <div className="pagination">
            {/* Pagination buttons can be implemented here if needed */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAssignee;
