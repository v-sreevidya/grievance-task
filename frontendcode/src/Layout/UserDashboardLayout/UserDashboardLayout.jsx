
import React from 'react';
import UserSidebar from '../../Components/Sidebar/User/UserSidebar';
import "./UserDashboardLayout.css";

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <UserSidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
