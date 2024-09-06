import React, { useState } from 'react';
import './GrievanceRegistration.css';
import File from '../../../Assets/icons/File.png';
import Logo from '../../../Assets/logo_Dashboard.png';

function GrievanceRegistration() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [ticketNumber, setTicketNumber] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        address: "",
        phoneNumber: "",
        reason: "1", // Default value for the reason select
        description: "",
        invoice: null,
        invoiceDate: ""
    });

    const handleClick = async () => {
        const randomTicketNumber = Math.floor(10000 + Math.random() * 90000);
        setTicketNumber(randomTicketNumber);
        setIsPopupVisible(true);

        // Prepare the form data to send to the backend
        const dataToSend = {
            name: formData.username,
            email: formData.email,
            
            
            reason: formData.reason,
            description: formData.description,
            invoiceDate: formData.invoiceDate,
            
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/grievances/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const result = await response.text();
                console.log(result); // Handle success
            } else {
                console.error('Failed to submit grievance'); // Handle errors
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleFileChange = (event) => {
        const fileInput = event.target;
        const fileName = fileInput.files.length > 0 ? fileInput.files[0].name : 'No file chosen';
        fileInput.setAttribute('data-file-name', fileName);

        setFormData({
            ...formData,
            invoice: event.target.files[0] // Store the file in formData
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    return (
        <div>
            <div className='grievance_main'>
                <div className="grievance_top">
                    <div className='welcome_note'>
                        <div className='note1'>Hi user,</div>
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
                                    <input className="registration-name-input" type="text" id="username" name="username" placeholder="Enter Name" value={formData.username} onChange={handleInputChange} />
                                </div>
                                <div className="registration-email">
                                    <label className="registration-email-label">Email Address</label>
                                    <input className="registration-email-input" type="text" id="email" name="email" placeholder="Enter Email Address" value={formData.email} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='registration-form-row'>
                                <div className="registration-address">
                                    <label className="registration-address-label">Address</label>
                                    <input className="registration-address-input" type="text" id="address" name="address" placeholder="Enter Address" value={formData.address} onChange={handleInputChange} />
                                </div>
                                <div className="registration-phoneNo">
                                    <label className="registration-phoneNo-label">Phone Number</label>
                                    <input className="registration-phoneNo-input" type="text" id="phoneNumber" name="phoneNumber" placeholder="Enter Phone Number" value={formData.phoneNumber} onChange={handleInputChange} />
                                </div>
                            </div>
                            <div className='registration-form-row'>
                                <div className="registration-reason">
                                    <label className="registration-reason-label" htmlFor="reason">Return Reason</label>
                                    <select className='registration-reason-input' name="reason" value={formData.reason} onChange={handleInputChange}>
                                        <option value="1">Select Reason</option>
                                        <option value="2">Damaged product</option>
                                        <option value="3">Shipping delay</option>
                                        <option value="4">Exchange/refund issue</option>
                                        <option value="5">Quality</option>
                                        <option value="6">Wrong Product (includes colour and size)</option>
                                        <option value="7">Availability Issues</option>
                                    </select>
                                </div>
                                <div className="registration-description">
                                    <label className="registration-description-label">Problem Description</label>
                                    <input className="registration-description-input" type="text" id="description" name="description" placeholder="Enter Description" value={formData.description} onChange={handleInputChange} />
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
                                        <input className="registration-invoiceDate-input" type="date" id="invoiceDate" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} />
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
                                            <div className='ticket-heading'>Your Ticket No :</div>
                                            <span className="ticket-number">{ticketNumber}</span>
                                        </div>
                                        <p className="note">( PLEASE NOTE FOR FUTURE PURPOSE )</p>
                                        <button onClick={closePopup} className="done-button">Done</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GrievanceRegistration;
