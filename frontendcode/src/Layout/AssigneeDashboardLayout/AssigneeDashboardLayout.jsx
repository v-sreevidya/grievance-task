
import React from 'react';
import AssigneeSidebar from '../../Components/Sidebar/Assignee/AssigneeSidebar';
import "./AssigneeDashboardLayout.css";

const AssigneeDashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      <AssigneeSidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default AssigneeDashboardLayout;
