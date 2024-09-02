

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from '../Pages/SignIn/SignIn';
import SignUp from '../Pages/SignUp/SignUp';
import SignUp2 from '../Pages/SignUp2/SignUp2';
import DashboardSupervisor from '../Pages/Supervisor/Dashboard/DashboardSupervisor';
import Grievances from '../Pages/User/Grievances/Grievances';
import Details from '../Pages/Details/Details';
import DashboardLayout from '../Layout/DashboardLayout/DashboardLayout';
import GrievanceRegistration from '../Pages/User/GrievanceRegistration/GrievanceRegistration';
import GrievanceDetails from '../Pages/Supervisor/EditGrievance/GrievanceDetails';
import NotificationUser from '../Pages/User/NotificationUser/NotificationUser';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/SignUp2" element={<SignUp2 />} />
      <Route path="/dashboard/supervisor" element={<DashboardLayout><DashboardSupervisor /></DashboardLayout>} />
      <Route path="/dashboard/supervisor/edit" element={<DashboardLayout><GrievanceDetails /></DashboardLayout>} />
      <Route path="/grievances" element={<DashboardLayout><Grievances /></DashboardLayout>} />
      <Route path="/grievanceregistration" element={<DashboardLayout><GrievanceRegistration /></DashboardLayout>} />
      <Route path="/details" element={<DashboardLayout><Details /></DashboardLayout>} />
      <Route path="/notificationuser" element={<DashboardLayout><NotificationUser/></DashboardLayout>} />

    </Routes>
  );
}

export default AppRoutes;
