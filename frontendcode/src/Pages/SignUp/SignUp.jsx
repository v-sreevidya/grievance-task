import React from 'react'
import Side_image from '../../Assets/Side_image.png'
import './SignUp.css'
import {Link} from 'react-router-dom'


function SignUp() {
  return (
    <div className="App">
      <div className='Signup'>
          <div className='left-section'>
              <img className='side_image' src={Side_image} alt="Side_image"/>
          </div>
          <div className='right-section'>
            <div className='box-signup'>
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
                <div className='form-signup'>
                    <form>
                        <div>
                            <div className="form-name">
                                <label className="name-label">Name</label>
                                <input className="name-input" type="text" id="name" name="name" placeholder="Enter Name" />
                            </div>

                            <div className="form-email">
                                <label className="email-label">Email</label>
                                <input className="email-input" type="text" id="email" name="email" placeholder=" Enter Password" />
                            </div>

                            <div className="form-phone-number">
                                <label className="phone-number-label">Phone Number</label>
                                <input className="phone-number-input" type="text" id="phone-number" name="phone-number" placeholder="Enter Phone Number" />
                            </div>

                            <div className="form-address">
                                <label className="address-label">Address</label>
                                <input className="address-input" type="text" id="address" name="address" placeholder="Enter Address" />
                            </div>
                        </div>  
                    </form>
                </div>
                <div className='footer-signup'> 
                <Link to ="/SignUp2" className='link'>
                    <div>
                        <button className='button-next' type="submit">Next</button>
                    </div>
                </Link>
                </div>
            </div>
          </div>        
      </div>
    </div>
    
  );
}

export default SignUp;
