import React from 'react'
import Side_image from '../../Assets/Side_image.png'
import './SignIn.css'
import {Link} from 'react-router-dom'


function SignIn() {
  return (
    <div className="App">
      <div className='Login'>
          <div className='left-section'>
              <img className='side_image' src={Side_image} alt="Side_image"/>
          </div>
          <div className='right-section'>
            <div className='box-signin'>
                <div className='header'>
                    <div className='first'>
                        <div className='welcome'>
                            Welcome to
                        </div>
                        <div className='grwmstore'>
                            GRWM Store
                        </div>
                    </div>
                    <Link to ="/SignUp" className='link'>
                        <div className='second'>
                            <div className='noaccount' >
                                No Account ?
                            </div>
                            <div className='signup' >
                                Sign Up
                            </div>
                        </div>
                    </Link>
                </div>
                <div className='intro'>
                    <div className='signin'>Sign In</div>
                    <div className='complaintregistration'>for Complaint Registration</div>
                </div>
                <div className='form-signin'>
                    <form>
                        <div>
                            <div className="form-username">
                                <label className="username-label">Username / Email Address</label>
                                <input className="username-input" type="text" id="username" name="username" placeholder="Enter Username / Email Address" />
                            </div>

                            <div className="form-password">
                                <label className="password-label">Password</label>
                                <input className="password-input" type="password" id="password" name="password" placeholder="Enter Password" />
                            </div>
                        </div>  
                    </form>
                </div>
                <div className='footer'>
                    <div >
                        <p className="track-order">Track Order?</p>
                    </div>
                    <div>
                        <Link to ="/grievances">
                        <button className='button-signin' type="submit">Sign In</button>
                        </Link>
                    </div>
                </div>
            </div>
          </div>        
      </div>
    </div>
    
  );
}

export default SignIn;
