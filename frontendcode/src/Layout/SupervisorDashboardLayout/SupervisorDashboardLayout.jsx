
import React from 'react';
import SupervisorSidebar from '../../Components/Sidebar/Supervisor/SupervisorSidebar';
import "./SupervisorDashboardLayout.css";

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <SupervisorSidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default UserDashboardLayout;
