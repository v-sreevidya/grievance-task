import React from 'react'
import Side_image from '../../Assets/Side_image.png'
import './SignUp2.css'
import { Link } from 'react-router-dom';


function SignUp2() {
  return (
    <div className="App">
      <div className='Signup'>
          <div className='left-section'>
              <img className='side_image' src={Side_image} alt="Side_image"/>
          </div>
          <div className='right-section'>
            <div className='box-signup2'>
                <div className='header'>
                    <div className='first'>
                        <div className='header-welcome'>
                            Welcome to
                        </div>
                        <div className='header-grwmstore'>
                            GRWM Store
                        </div>
                    </div>
                    <Link to ="/" className='link'>
                    <div className='second'>
                        <div className='header-haveaccount' >
                            Have Account ?
                        </div>
                        <div className='header-signin' >
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
                <div className='footer-signup'>
                    <Link to ="/" className='link'>
                        <div>
                            <button className='button-next' type="submit">Sign Up</button>
                        </div>
                    </Link>
                </div>
            </div>
          </div>        
      </div>
    </div>
    
  );
}

export default SignUp2;
