import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './SupervisorSidebar.css';
import Logo_dashboard from '../../../Assets/logo_Dashboard.png';
import Icon_grievance_inactive from '../../../Assets/icons/Grievances_inactive.png';
import Icon_notification_inactive from '../../../Assets/icons/Notification_inactive.png';

export class SupervisorSidebar extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: '/dashboard/supervisor',
    };
  }

  handleMenuClick = (menu) => {
    this.setState({ activeMenu: menu });
  };

  render() {
    const { activeMenu } = this.state;

    return (
      <div className='container_sidebar'>
        <div className='sidebar'>
          <div className='logo'>
            <img className='logocontainer' src={Logo_dashboard} alt="Logo" />
          </div>
          <div className='mainnavigation'>
            <div className='menu'>
              <Link
                to="/dashboard/supervisor"
                className={`dashboard_supervisor ${activeMenu === '/dashboard/supervisor' ? 'active' : ''}`}
                onClick={() => this.handleMenuClick('/dashboard/supervisor')}
              >
                <img className='icon_grievance_inactive' src={Icon_grievance_inactive} alt="grievance_inactive" />
                <div>Grievances</div>
              </Link>
              <Link
                to="/dashboard/supervisor/notifications"
                className={`notificationuser ${activeMenu === '/dashboard/supervisor/notifications' ? 'active' : ''}`}
                onClick={() => this.handleMenuClick('/dashboard/supervisor/notifications')}
              >
                <img className='icon_notification_inactive' src={Icon_notification_inactive} alt="notification_inactive" />
                <div>Notification</div>
              </Link>
            </div>
            <div className='bottom'>
              <div className='user_indicator'>
                <div className='user_avatar'>S</div>
                <div className='user_details'>
                  <div className="user_name">Supervisor</div>
                  <div className="user_email">Supervisor@gmail.com</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="vertical-line"></div>
      </div>
    );
  }
}

export default SupervisorSidebar;
