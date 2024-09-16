import React, {useContext} from 'react';
import Side_image from '../../Assets/Side_image.png';
import './SignUp2.css';
import { Link } from 'react-router-dom';
import { FormContext } from '../../FormContext/FormContext';
import axios from 'axios';


function SignUp2() {
  const{ formData, updateFormData, resetFormData }= useContext(FormContext);

    

    const handleChange = (e) => {
      updateFormData({ [e.target.name]: e.target.value });
    };

    
  

    const handleSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:8080/api/users/signup', formData);
        console.log('User signed up successfully:', response.data);
        resetFormData();
      } catch (error) {
        console.error('There was an error signing up the user:', error);
      }
    };

  return (
    <div className="App">
      <div className='Signup'>
        <div className='left-section'>
          <img className='side_image' src={Side_image} alt="Side_image" />
        </div>
        <div className='right-section'>
            <div className={`box-signup2 ${formData.role === "ASSIGNEE" ? 'assignee' : ''}`}>
            <div className='header'>
              <div className='first'>
                <div className='header-welcome'>
                  Welcome to
                </div>
                <div className='header-grwmstore'>
                  GRWM Store
                </div>
              </div>
              <Link to="/" className='link' >
                <div className='second'>
                  <div className='header-haveaccount'>
                    Have Account?
                  </div>
                  <div className='header-signin'>
                    Sign In
                  </div>
                </div>
              </Link>
            </div>
            <div className='intro'>
              <div className='into-signup'>Sign Up</div>
              <div className='complaintregistration'>for Complaint Registration</div>
            </div>
            <div className='form-signup2'>
              <form>
                <div>
                  <div className="form-username-signup2">
                    <label className="username-label-signup2">Username</label>
                    <input
                      className="username-input-signup2"
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                      value={formData.username}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-password-signup2">
                    <label className="password-label-signup2">Password</label>
                    <input
                      className="password-input-signup2"
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-role-signup2">
                    <label className="role-label-signup2">Role</label>
                    <select
                      className="role-input"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option >Select Role</option>
                      <option value="USER">USER</option>
                      <option value="SUPERVISOR">SUPERVISOR</option>
                      <option value="ASSIGNEE">ASSIGNEE</option>
                    </select>
                  </div>

                  {formData.role === "ASSIGNEE" && (
                    <div className="form-extra-signup2">
                      <div className="form-department-signup2">
                        <label className="department-label-signup2">Department</label>
                        <input
                          className="department-input-signup2"
                          type="text"
                          id="department"
                          name="department"
                          placeholder="Enter Department"
                          value={formData.department}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </div>
            <div className='footer-signup'>
              
                <div>
                  <Link to ='/'>
                  <button className='button-next' type="submit" onClick={handleSubmit}>Sign Up</button>
                  </Link>
                </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp2;
