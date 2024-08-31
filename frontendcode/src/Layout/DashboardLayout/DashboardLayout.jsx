
import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import "./DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
