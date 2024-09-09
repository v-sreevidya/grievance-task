import React, { useState, useEffect } from 'react';
import './Grievances.css';
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png';
import Resolved from '../../../Assets/icons/status/resolved.png';
import Closed from '../../../Assets/icons/status/closed.png';
import { Link } from 'react-router-dom';
import GrievanceRegistration from '../GrievanceRegistration/GrievanceRegistration';
import axios from 'axios';

function Grievances() {
  const [grievances, setGrievances] = useState([]);

  // Fetch grievances from the backend
  const fetchGrievances = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/grievances');
      setGrievances(response.data);
    } catch (error) {
      console.error('Error fetching grievances:', error);
    }
  };

  useEffect(() => {
    fetchGrievances(); 
  }, []);

  // Function to add a new grievance and update the dashboard
  const addGrievance = (newGrievance) => {
    setGrievances((prevGrievances) => [...prevGrievances, newGrievance]);
  };

  
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

  
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const sortGrievances = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedArray = [...grievances].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setGrievances(sortedArray);
    setSortConfig({ key, direction });
  };

  return (
    <div className="grievance_main">
      <div className="grievance_top">
        <div className="welcome_note">
          <div className="note1">Hi User,</div>
          <div className="note2">Welcome to GRWM Store!</div>
        </div>
        <div className="search">
          <form>
            <div>
              <div className="form-search">
                <input
                  className="search-input"
                  type="search"
                  id="search"
                  name="search"
                  placeholder="Search for Ticket No"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
      
      <div className="list_container_grievances">
        <div className="title_bar">
          <div className="title">Grievances</div>
          <Link to="/GrievanceRegistration">
            <button>CREATE</button>
          </Link>
        </div>
        
        <div className="horizontal-line"></div>

        {/* Table for displaying grievances */}
        
        <table>
          <thead>
            <tr className="menu_bar">
              <th className="ticketNumber" onClick={() => sortGrievances('ticketNumber')}>
                TICKET NO
                <span>
                  <img className="arrow_down" src={Arrowdown} alt="Arrowdown" />
                </span>
              </th>
              <th className="createdAt" onClick={() => sortGrievances('createdAt')}>
                DATE
                <span>
                  <img className="arrow_down" src={Arrowdown} alt="Arrowdown" />
                </span>
              </th>
              <th className="status" onClick={() => sortGrievances('status')}>
                STATUS
                <span>
                  <img className="arrow_down" src={Arrowdown} alt="Arrowdown" />
                </span>
              </th>
            </tr>
          </thead>
        </table>
        

        <div className="horizontal-line2"></div>
       
       
        <table className="grievance-table">
          <tbody className="list">
            {grievances.map((grievance) => (
              <tr className="list_row" key={grievance.ticketNumber}>
                <td className="list_data_ticketNumber">{grievance.ticketNumber}</td>
                <td className="list_data_createdAt">{grievance.createdAt}</td>
                <td className="list_data_status">
                  <span className="list_data_status_icon">{getStatusIcon(grievance.status)}</span>
                  <span>{grievance.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        

        <div className="bottom_section">
          <div className="horizontal-line3"></div>
          
          <div className="pagination">
            <button className="pagination-button">&lt;</button>
            <span className="pagination-info">1</span>
            <button className="pagination-button">&gt;</button>
          </div>
        </div>
      </div>
     

      {/* Grievance Registration component */}
      <GrievanceRegistration addGrievance={addGrievance} />
    </div>
     
  );
}

export default Grievances;
