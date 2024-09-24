import React, { useState } from 'react';
import axios from 'axios';
import Side_image from '../../Assets/Side_image.png';
import './SignIn.css';
import { Link, useNavigate } from 'react-router-dom';

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/auth/signin', {
        username,
        password
      });
      const user = response.data;

      // Redirect based on user role
      if (user.role === 'USER') {
        navigate('/user/grievances');
      } else if (user.role === 'SUPERVISOR') {
        navigate('/dashboard/supervisor');
      } else if (user.role === 'ASSIGNEE') {
        navigate('/dashboard/assignee');
      } else {
        setErrors({ general: 'Invalid role' });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrors({ general: 'Invalid credentials' });
    }
  };

  return (
    <div className="App">
      <div className='Login'>
        <div className='left-section'>
          <img className='side_image' src={Side_image} alt="Side_image" />
        </div>
        <div className='right-section'>
          <div className='box-signin'>
            <div className='header'>
              <div className='first'>
                <div className='welcome'>Welcome to</div>
                <div className='grwmstore'>GRWM Store</div>
              </div>
              <Link to="/SignUp" className='link'>
                <div className='second'>
                  <div className='noaccount'>No Account?</div>
                  <div className='signup'>Sign Up</div>
                </div>
              </Link>
            </div>
            <div className='intro'>
              <div className='signin'>Sign In</div>
              <div className='complaintregistration'>for Complaint Registration</div>
            </div>
            <div className='form-signin'>
              <form onSubmit={handleSignIn}>
                <div>
                  <div className="form-username">
                    <label className="username-label">Username / Email Address</label>
                    <input
                      className="username-input"
                      type="text"
                      id="username"
                      name="username"
                      placeholder={errors.username ? errors.username : "Enter Username / Email Address"}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      style={errors.username ? { borderColor: 'red' } : {}}
                    />
                  </div>

                  <div className="form-password">
                    <label className="password-label">Password</label>
                    <input
                      className="password-input"
                      type="password"
                      id="password"
                      name="password"
                      placeholder={errors.password ? errors.password : "Enter Password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={errors.password ? { borderColor: 'red' } : {}}
                    />
                  </div>
                </div>
                {errors.general && <div style={{ color: 'red' }}>{errors.general}</div>}
                <div className='footer'>
                  <div><p className="track-order">Track Order?</p></div>
                  <div><button className='button-signin' type="submit">Sign In</button></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
