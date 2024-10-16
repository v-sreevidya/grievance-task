import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import SignUp2 from '../Pages/SignUp2/SignUp2';
import DashboardSupervisor from '../Pages/Supervisor/Dashboard/DashboardSupervisor';
import Grievances from '../Pages/User/Grievances/Grievances';
import UserDashboardLayout from '../Layout/UserDashboardLayout/UserDashboardLayout';
import SupervisorDashboardLayout from '../Layout/SupervisorDashboardLayout/SupervisorDashboardLayout';
import AssigneeDashboardLayout from '../Layout/AssigneeDashboardLayout/AssigneeDashboardLayout';
import GrievanceRegistration from '../Pages/User/GrievanceRegistration/GrievanceRegistration';
import GrievanceDetails from '../Pages/Supervisor/EditGrievance/GrievanceDetails';
import GrievanceDetailsAssignee from '../Pages/Assignee/EditGrievance/GrievanceDetailsAssignee';
import NotificationUser from '../Pages/User/NotificationUser/NotificationUser';
import NotificationSupervisor from '../Pages/Supervisor/NotificationSupervisor/NotificationSupervisor';
import DashboardAssignee from '../Pages/Assignee/DashBoard/DashboardAssignee';
import NotificationAssignee from '../Pages/Assignee/NotificationAssignee/NotificationAssignee';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/grievances/:ticketNumber" element={<GrievanceDetails />} />
      <Route path="/" element={<SignIn />} />
      <Route path="/signUp" element={<SignUp />} />
      <Route path="/signUp2" element={<SignUp2 />} />

      {/* SUPERVISOR */}
      <Route path="/dashboard/supervisor" element={<SupervisorDashboardLayout><DashboardSupervisor /></SupervisorDashboardLayout>} />
      <Route path="/dashboard/supervisor/edit/:ticketNumber" element={<SupervisorDashboardLayout><GrievanceDetails /></SupervisorDashboardLayout>} />
      <Route path="/dashboard/supervisor/notifications" element={<SupervisorDashboardLayout><NotificationSupervisor/></SupervisorDashboardLayout>} />

      {/* ASSIGNEE */}
      <Route path="/dashboard/assignee" element={<AssigneeDashboardLayout><DashboardAssignee /></AssigneeDashboardLayout>} />
      <Route path="/dashboard/assignee/edit/:ticketNumber" element={<AssigneeDashboardLayout><GrievanceDetailsAssignee /></AssigneeDashboardLayout>} />
      <Route path="/dashboard/assignee/notifications" element={<AssigneeDashboardLayout><NotificationAssignee/></AssigneeDashboardLayout>} />

      {/* USER */}
      <Route path="/user/grievances" element={<UserDashboardLayout><Grievances /></UserDashboardLayout>} />
      <Route path="/user/grievanceregistration" element={<UserDashboardLayout><GrievanceRegistration /></UserDashboardLayout>} />
      <Route path="/user/notifications" element={<UserDashboardLayout><NotificationUser/></UserDashboardLayout>} />
    </Routes>
  );
}

export default AppRoutes;
