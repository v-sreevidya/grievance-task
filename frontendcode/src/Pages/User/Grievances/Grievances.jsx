import React, { useState, useEffect } from 'react';
import './Grievances.css';
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png';
import Resolved from '../../../Assets/icons/status/resolved.png';
import Closed from '../../../Assets/icons/status/closed.png';
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

function Grievances() {
  const [grievances, setGrievances] = useState([]);
  const [sortedGrievances, setSortedGrievances] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

  useEffect(() => {
    // Fetch grievances from the server when the component mounts
    fetch('http://localhost:3000/api/grievances')
      .then(response => response.json())
      .then(data => {
        setGrievances(data);
        setSortedGrievances(data);
      })
      .catch(error => console.error('Error fetching grievances:', error));
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

  const handleAddGrievance = () => {
    // Example data for adding a grievance
    const newGrievance = {
      ticketNo: 'TCKT-123461',
      date: new Date().toISOString().split('T')[0],
      status: 'PENDING'
    };

    fetch('http://localhost:3000/api/grievances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newGrievance)
    })
    .then(response => response.json())
    .then(data => {
      // Update the grievances list with the new grievance
      setGrievances(prev => [...prev, data]);
      setSortedGrievances(prev => [...prev, data]);
    })
    .catch(error => console.error('Error adding grievance:', error));
  };

  return (
    <div className='grievance_main'>
      <div className="grievance_top">
        <div className='welcome_note'>
          <div className='note1'>Hi User,</div>
          <div className='note2'>Welcome to GRWM Store!</div>
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

      <div className='list_container_grievances'>
        <div className="title_bar">
          <div className='title'>Grievances</div>
          <Link to="/GrievanceRegistration">
            <button onClick={handleAddGrievance}>ADD</button>
          </Link>
        </div>
        <div className="horizontal-line"></div>
        <div>
          <tr className="menu_bar">
            <div>
              <th className="ticket_no" onClick={() => sortGrievances('ticketNo')}>
                TICKET NO 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="date" onClick={() => sortGrievances('date')}>
                DATE 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
            <div>
              <th className="status" onClick={() => sortGrievances('status')}>
                STATUS 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown" /></span>
              </th>
            </div>
          </tr>
        </div>
        <div className="horizontal-line2"></div>
        <table className="grievance-table">
          <tbody className="list">
            {sortedGrievances.map((grievance, index) => (
              <tr className='list_row' key={index}>
                <td className='list_data_ticketNo'>{grievance.ticketNo}</td>
                <td className='list_data_date'>{grievance.date}</td>
                <td className='list_data_status'>
                  <span className='list_data_status_icon'>{getStatusIcon(grievance.status)}</span>
                  <span>{grievance.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='bottom_section'>
          <div className="horizontal-line3"></div>
          <div className="pagination">
            <button className="pagination-button">
              &lt;
            </button>
            <span className="pagination-info">1</span>
            <button className="pagination-button">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grievances;
