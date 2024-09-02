import React,{useState} from 'react'
import './GrievanceRegistration.css'
import File from '../../../Assets/icons/File.png'
import Logo from '../../../Assets/logo_Dashboard.png'
import { Link } from 'react-router-dom';

function GrievanceRegistration() {
    const [isPopupVisible,setIsPopupVisible]=useState(false);
    const [ticketNumber, setTicketNumber] = useState("");

    const handleClick = () => {
        const randomTicketNumber=Math.floor(10000 + Math.random() * 90000);
        setTicketNumber(randomTicketNumber);
        setIsPopupVisible(true);
    };


    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';


        fileInput.setAttribute('data-file-name', fileName);
    };



  return (
    <div>
      <div className='grievance_main'>
            <div className="grievance_top">
                <div className='welcome_note'>
                        <div className='note1'>Hi User,</div>
                        <div className='note2'>Welcome to GRWM Store!</div>
                    </div>
            </div>
      
            <div className='list_container'>
                <div className="title_bar">
                    <div className='title'>Grievances Registration</div>
                </div>
            <div className="horizontal-line"></div>
            
            <div className="form-registration">
                <form>
                    <div className='registration-form-row'>
                        <div className="registration-name">
                        <label className="registration-name-label">Name</label>
                        <input className="registration-name-input" type="text" id="username" name="username" placeholder="Enter Name" />
                        </div>
                        <div className="registration-email">
                        <label className="registration-email-label">Email Address</label>
                        <input className="registration-email-input" type="text" id="email" name="email" placeholder="Enter Email Address" />
                        </div>
                    </div>
                    <div className='registration-form-row'>
                        <div className="registration-address">
                        <label className="registration-address-label">Address</label>
                        <input className="registration-address-input" type="text" id="address" name="address" placeholder="Enter Address" />
                        </div>
                        <div className="registration-phoneNo">
                        <label className="registration-phoneNo-label">Phone Number</label>
                        <input className="registration-phoneNo-input" type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" />
                        </div>
                    </div>
                    <div className='registration-form-row'>
                        <div className="registration-reason">
                            <label className="registration-reason-label" htmlFor="reason">Return Reason</label>
                                <select className='registration-reason-input' defaultValue="1">
                                    <option value="1">Select Reason </option>
                                    <option value="2">Damaged product </option>
                                    <option value="3">Shipping delay </option>
                                    <option value="4">Exchange/refund issue</option>
                                    <option value="5">Quality </option>
                                    <option value="6">Wrong Product (includes colour and size)</option>
                                    <option value="7">Availability Issues</option>
                            </select>
                        </div>
                        <div className="registration-description">
                        <label className="registration-description-label">Problem Description</label>
                        <input className="registration-description-input" type="text" id="description" name="description" placeholder="Enter Phone Number" />
                        </div>
                    </div>
                    <div className='registration-form-row'>
                    <div className="registration-invoice">
                    <label className="registration-invoice-label" htmlFor="invoice">Invoice / Bill</label>
                    <div className="file-input">
                        <input 
                            className="registration-invoice-input" 
                            type="file" 
                            id="invoice" 
                            name="invoice"
                            onChange={handleFileChange} 
                        />
                        <img className="file-choose" src={File} alt="File" />
                       
                    </div>
                    </div>
                        <div className="registration-invoiceDate">
                            <label className="registration-invoiceDate-label">Invoice Date</label>
                            <div className="calender-input">
                                <input className= "registration-invoiceDate-input" type="date" id="invoiceDate" name="invoiceDate"  />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="horizontal-line"></div>
            <div className="submit">
                <div className={`app-container ${isPopupVisible ? "blurred" : ""}`}>
                <button className="submit-button" onClick={handleClick}>ADD</button>

                {isPopupVisible && (
                    <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup" onClick={(e) => e.stopPropagation()}>
                        <img src={Logo} alt="Logo" className="popup-logo" />
                        <h1>Thank you !</h1>
                        <p>Your help is on its way.</p>
                        <div className="ticket">
                            <div className='ticket-heading'>Your Ticket No :    
                            </div>
                            <span className="ticket-number">{ticketNumber}</span>
                        </div>
                        <p className="note">( PLEASE NOTE FOR FUTURE PURPOSE )</p>
                        <Link to ="/grievances">
                        <button onClick={closePopup} className="done-button">Done</button>
                        </Link>
                    </div>
                    </div>
                )}
                </div>

            </div>
            </div>
        
    </div>
    </div>
    
  )
}

export default GrievanceRegistration
