import React, { useState } from 'react';

function GrievanceDetails() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    returnReason: '',
    problemDescription: '',
    invoice: '',
    invoiceDate: '',
    assignee: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send formData to a server using fetch or axios
    console.log(formData); // For demonstration purposes
  };

  const assignees = ['Assignee 1', 'Assignee 2', 'Assignee 3']; // Replace with actual assignees

  return (
    <div className="grievance_main">
      <div className="grievance_top">
        <div className="welcome_note">
          <div className="note1">Hi Supervisor,</div>
          <div className="note2">Welcome to GRWM Dashboard!</div>
        </div>

        <div className="list_container">
          <div className="title_bar">
            <div className="title">Grievances</div>
          </div>
          <div className="horizontal-line"></div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            

            {/* Other input fields for email, address, etc. */}

            <label htmlFor="assignee">Assignee:</label>
            <select id="assignee" name="assignee" value={formData.assignee} onChange={handleChange} required>
              <option value="">Select Assignee</option>
              {assignees.map((assignee) => (
                <option key={assignee} value={assignee}>
                  {assignee}
                </option>
              ))}
            </select>

            <button type="submit">SUBMIT</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GrievanceDetails;