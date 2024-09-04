import React,{useState} from 'react'
import './Grievances.css';
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png'
import Resolved from '../../../Assets/icons/status/resolved.png'
import Closed from '../../../Assets/icons/status/closed.png'
import { Link } from 'react-router-dom';


const grievances = [
  // { ticketNo: '123456', date: '2024-01-15', status: 'PENDING' },
  // { ticketNo: '123457', date: '2024-01-16', status: 'OPEN' },
  // { ticketNo: '123458', date: '2024-01-17', status: 'INPROGRESS' },
  // { ticketNo: '123459', date: '2024-01-18', status: 'RESOLVED' },
  // { ticketNo: '123460', date: '2024-01-19', status: 'CLOSED' },
  // { ticketNo: '123556', date: '2024-01-15', status: 'PENDING' },
  // { ticketNo: '128657', date: '2024-01-16', status: 'OPEN' },
  // { ticketNo: '823458', date: '2024-01-17', status: 'INPROGRESS' },
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
    default:
      return null;
    
  }
};



function Grievances() {


  const [sortedGrievances, setSortedGrievances] = useState(grievances);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });

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
          <Link to ="/GrievanceRegistration" >
            <button>ADD</button>
          </Link>
        </div>
        <div class="horizontal-line"></div>
        <div>
            <tr className="menu_bar">
              <div>
              <th className="ticket_no" onClick={() => sortGrievances('ticketNo')}>
                  TICKET NO 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
              <div>
                <th className="date" onClick={() => sortGrievances('date')}>
                  DATE 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
              <div>
              <th className="status" onClick={() => sortGrievances('status')}>
                  STATUS 
                <span><img className="arrow_down" src={Arrowdown} alt="Arrowdown"/></span>
                </th>
              </div>
          </tr>
          
          
        



        </div>
        <div class="horizontal-line2" ></div>
        <table className="grievance-table">
                

                  <tbody className="list">
                    {sortedGrievances.map((grievance, ticketNo) => (
                      <tr className='list_row' key={ticketNo}>
                        <div><td className='list_data_ticketNo'>{grievance.ticketNo}</td></div>
                        <div><td className='list_data_date'>{grievance.date}</td></div>
                        <div>
                        <td className='list_data_status'>
                          <span className='list_data_status_icon'>{getStatusIcon(grievance.status)}</span>
                          <span>{grievance.status}</span>
                        </td>
                        </div>
                      </tr>
                    ))}
                  </tbody>






        </table> 
        <div className='bottom_section'>
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
      
    </div>

  )
}

export default Grievances
