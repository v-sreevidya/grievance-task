import React,{useState} from 'react'
import './DashboardAssignee.css'
import Arrowdown from '../../../Assets/icons/Arrow drop down.png';
import Pending from '../../../Assets/icons/status/pending.png';
import Inprogress from '../../../Assets/icons/status/inprogress.png';
import Open from '../../../Assets/icons/status/open.png'
import Resolved from '../../../Assets/icons/status/resolved.png'
import Closed from '../../../Assets/icons/status/closed.png'
import { Link } from 'react-router-dom';


const grievances = [
  // { ticketNo: '123456', date: '2024-01-15', userid: '552361', assigneeid: '159863', category: '3', status: 'PENDING' },
  // { ticketNo: '123457', date: '2024-01-16', userid: '910835', assigneeid: '369875', category: '2', status: 'OPEN' },
  // { ticketNo: '123458', date: '2024-01-17', userid: '555883', assigneeid: '128796', category: '1', status: 'INPROGRESS' },
  // { ticketNo: '123459', date: '2024-01-18', userid: '454679', assigneeid: '486259', category: '4', status: 'CLOSED' },
  // { ticketNo: '123460', date: '2024-01-19', userid: '166245', assigneeid: '854137', category: '5', status: 'RESOLVED' },
  // { ticketNo: '123434', date: '2024-01-15', userid: '166245', assigneeid: '124587', category: '2', status: 'PENDING' },
  // { ticketNo: '123469', date: '2024-01-16', userid: '846592', assigneeid: '986574', category: '1', status: 'OPEN' },
  // { ticketNo: '196534', date: '2024-01-15', userid: '166245', assigneeid: '124587', category: '2', status: 'PENDING' },
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





function DashboardAssignee(){
  
  const [sortedGrievances, setSortedGrievances] = useState(grievances);
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [hoveredGrievance, setHoveredGrievance] = useState(null);

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






const handleMouseEnter = (ticketNo) => {
  setHoveredGrievance(ticketNo);
};

const handleMouseLeave = () => {
  setHoveredGrievance(null);
};


const handleEdit = (ticketNo) => {
  console.log(`Edit grievance with ticket number: ${ticketNo}`);
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
                      <input className='search-input' type="search" id="search" name="search" placeholder="Search for Ticket No" />
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
                <th className="ticket_no_assignee" onClick={() => sortGrievances('ticketNo')}>
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
                  USER ID
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
        <div class="horizontal-line2" ></div>
        <table className="grievance-table">
                

                  <tbody className="list">
                    {sortedGrievances.map((grievance, ticketNo) => (
                      <tr className='list_row' key={ticketNo}
                      onMouseEnter={() => handleMouseEnter(grievance.ticketNo)}
                      onMouseLeave={handleMouseLeave}
                      >
                        <div><td className='list_data_ticketNo_assignee'>{grievance.ticketNo}</td></div>
                        <div><td className='list_data_date_assignee'>{grievance.date}</td></div>
                        <div><td className='list_data_userid_assignee'>{grievance.userid}</td></div>
                        <div><td className='list_data_category_assignee'>{grievance.category}</td></div>
                        <div>
                        <td className='list_data_status_assignee'>
                          {hoveredGrievance === grievance.ticketNo ? (
                            grievance.status === 'INPROGRESS' ? (
                             
                              <Link to ="/dashboard/assignee/edit">
                                <button className='edit_button_assignee' onClick={() => handleEdit(grievance.ticketNo)}>EDIT</button>
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


export default DashboardAssignee
