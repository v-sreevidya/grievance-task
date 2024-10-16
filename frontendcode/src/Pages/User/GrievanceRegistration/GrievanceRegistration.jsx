import React, { useState } from 'react';
import './GrievanceRegistration.css';
import Logo from '../../../Assets/logo_Dashboard.png';
import { Link } from 'react-router-dom';

function GrievanceRegistration() {
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [ticketNumber, setTicketNumber] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        address: "",
        phoneNumber: "",
        reason: "",
        description: "",
        invoiceDate: ""
    });

    const [validationErrors, setValidationErrors] = useState([]);

    const handleClick = async () => {
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const randomTicketNumber = `${Math.floor(Math.random() * 1000000)}`;

        const dataToSend = {
            ...formData,
            name: formData.username,
            ticketNumber: randomTicketNumber
        };

        try {
            const response = await fetch('http://localhost:8080/api/v1/grievances/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setTicketNumber(randomTicketNumber);
                setIsPopupVisible(true);
            } else {
                console.error('Failed to submit grievance');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const validateForm = () => {
        const errors = {};
        const requiredFields = ['username', 'email', 'address', 'phoneNumber', 'reason', 'description', 'invoiceDate'];

        requiredFields.forEach(field => {
            if (!formData[field]) {
                errors[field] = 'This field is required';
            }
        });

        return errors;
    };

    const closePopup = () => {
        setIsPopupVisible(false);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
        }));
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
                                    <input
                                        className="registration-name-input"
                                        type="text"
                                        id="username"
                                        name="username"
                                        placeholder={validationErrors.username || "Enter Name"}
                                        style={validationErrors.username ? { borderColor: 'red' } : {}}
                                        value={formData.username}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="registration-email">
                                    <label className="registration-email-label">Email Address</label>
                                    <input
                                        className="registration-email-input"
                                        type="text"
                                        id="email"
                                        name="email"
                                        placeholder={validationErrors.email || "Enter Email Address"}
                                        style={validationErrors.email ? { borderColor: 'red' } : {}}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='registration-form-row'>
                                <div className="registration-address">
                                    <label className="registration-address-label">Address</label>
                                    <input
                                        className="registration-address-input"
                                        type="text"
                                        id="address"
                                        name="address"
                                        placeholder={validationErrors.address || "Enter Address"}
                                        style={validationErrors.address ? { borderColor: 'red' } : {}}
                                        value={formData.address}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="registration-phoneNo">
                                    <label className="registration-phoneNo-label">Phone Number</label>
                                    <input
                                        className="registration-phoneNo-input"
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder={validationErrors.phoneNumber || "Enter Phone Number"}
                                        style={validationErrors.phoneNumber ? { borderColor: 'red' } : {}}
                                        value={formData.phoneNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='registration-form-row'>
                                <div className="registration-reason">
                                    <label className="registration-reason-label" htmlFor="reason">Return Reason</label>
                                    <select
                                        className='registration-reason-input'
                                        id="reason"
                                        name="reason"
                                        style={validationErrors.reason ? { borderColor: 'red' } : {}}
                                        value={formData.reason}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled hidden>Select Reason</option>
                                        <option value="Damaged product">1. Damaged product</option>
                                        <option value="Shipping delay">2. Shipping delay</option>
                                        <option value="Exchange/Refund issue">3. Exchange/Refund issue</option>
                                        <option value="Quality">4. Quality</option>
                                        <option value="Wrong Product">5. Wrong Product (includes colour and size)</option>
                                    </select>
                                </div>
                                <div className="registration-description">
                                    <label className="registration-description-label">Problem Description</label>
                                    <input
                                        className="registration-description-input"
                                        type="text"
                                        id="description"
                                        name="description"
                                        placeholder={validationErrors.description || "Enter Description"}
                                        style={validationErrors.description ? { borderColor: 'red' } : {}}
                                        value={formData.description}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <div className='registration-form-row'>
                                <div className="registration-invoiceDate">
                                    <label className="registration-invoiceDate-label">Invoice Date</label>
                                    <div className="calender-input">
                                        <input
                                            className="registration-invoiceDate-input"
                                            type="date"
                                            id="invoiceDate"
                                            name="invoiceDate"
                                            placeholder={validationErrors.invoiceDate || "Enter Invoice Date"}
                                            style={validationErrors.invoiceDate ? { borderColor: 'red' } : {}}
                                            value={formData.invoiceDate}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="horizontal-line"></div>
                    <div className="buttons_user">
                        <div className="submit">
                            <div className={`app-container ${isPopupVisible ? "blurred" : ""}`}>
                                <button className="submit-button-user" onClick={handleClick}>ADD</button>

                                {isPopupVisible && (
                                    <div className="popup-overlay" onClick={closePopup}>
                                        <div className="popup" onClick={(e) => e.stopPropagation()}>
                                            <img src={Logo} alt="Logo" className="popup-logo" />
                                            <h1>Thank you!</h1>
                                            <p>Your help is on its way.</p>
                                            <div className="ticket">
                                                <div className='ticket-heading'>Your Ticket No :</div>
                                                <span className="ticket-number">{ticketNumber}</span>
                                            </div>
                                            <p className="note">( PLEASE NOTE FOR FUTURE PURPOSE )</p>
                                            <Link to="/user/grievances">
                                                <button onClick={closePopup} className="done-button">Done</button>
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='close_user'>
                            <Link to="/user/grievances">
                                <button className='close_button_user' type="submit">CLOSE</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GrievanceRegistration;
