import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

// Layouts
import UserLayout from './layouts/UserLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth components
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';

// User pages
import Dashboard from './pages/user/Dashboard';
import Profile from './pages/user/Profile';
import Wallet from './pages/user/Wallet';
import Team from './pages/user/Team';
import Achievements from './pages/user/Achievements';
import Referrals from './pages/user/Referrals';
import Mailbox from './pages/user/Mailbox';
import Settings from './pages/user/Settings';
import Performance from './pages/user/Performance';
import Network from './pages/user/Network';
import Shopping from './pages/user/Shopping';
import Store from './pages/user/Store';
import Payouts from './pages/user/Payouts';
import Home from './pages/user/Home';
import MatrixView from './pages/user/network/MatrixView';
import ReferralsView from './pages/user/network/ReferralsView';
import Contents from './pages/user/contents/Contents';
import Courses from './pages/user/contents/Courses';
import Webinars from './pages/user/contents/Webinars';
import Calls from './pages/user/contents/Calls';
import Archives from './pages/user/contents/Archives';
import Forums from './pages/user/contents/Forums';
import Resources from './pages/user/contents/Resources';
import Perks from './pages/user/contents/Perks';
import Help from './pages/user/Help';
import Membership from './pages/user/membership/Membership';

// Admin pages
import AdminDashboard from './pages/admin/dashboard/Dashboard';
import UserManagement from './pages/admin/users/UserManagement';
import AdminEWallet from './pages/admin/EWallet';
import OrderHistory from './pages/admin/orders/OrderHistory';
import AdminProfile from './pages/admin/profile/AdminProfile';

// Network pages
import NetworkTreeView from './pages/admin/network/TreeView';
import ReferralMembers from './pages/admin/network/ReferralMembers';

// Tools pages
import UploadMaterial from './pages/admin/tools/UploadMaterial';
import ToolsLeads from './pages/admin/tools/Leads';
import FAQ from './pages/admin/tools/FAQ';
import News from './pages/admin/tools/News';
import AdminCourses from './pages/admin/tools/Courses';
import AdminWebinars from './pages/admin/tools/Webinars';
import AdminCalls from './pages/admin/tools/Calls';
import AdminQnA from './pages/admin/tools/QnA';
import AdminResources from './pages/admin/tools/Resources';

// Settings pages
import GeneralSettings from './pages/admin/settings/General';
import SecuritySettings from './pages/admin/settings/Security';
import EmailSettings from './pages/admin/settings/Email';
import PaymentSettings from './pages/admin/settings/Payment';
import MembershipControls from './pages/admin/membership/MembershipControls';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* All main pages inside UserLayout for sidebar/navbar visibility */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Home />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="home" element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="reset-password" element={<ResetPassword />} />
        {/* Protected user pages */}
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
        <Route path="team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
        <Route path="achievements" element={<ProtectedRoute><Achievements /></ProtectedRoute>} />
        <Route path="referrals" element={<ProtectedRoute><Referrals /></ProtectedRoute>} />
        <Route path="mailbox" element={<ProtectedRoute><Mailbox /></ProtectedRoute>} />
        <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="performance" element={<ProtectedRoute><Performance /></ProtectedRoute>} />
        <Route path="matrix">
          <Route index element={<ProtectedRoute><MatrixView /></ProtectedRoute>} />
          <Route path="referrals" element={<ProtectedRoute><ReferralsView /></ProtectedRoute>} />
        </Route>
        <Route path="shopping" element={<Shopping />} />
        <Route path="store" element={<Store />} />
        <Route path="payouts" element={<ProtectedRoute><Payouts /></ProtectedRoute>} />
        <Route path="contents">
          <Route index element={<Contents />} />
          <Route path="courses" element={<Courses />} />
          <Route path="webinars" element={<Webinars />} />
          <Route path="calls" element={<Calls />} />
          <Route path="archives" element={<Archives />} />
          <Route path="forums" element={<Forums />} />
          <Route path="resources" element={<Resources />} />
          <Route path="perks" element={<Perks />} />
        </Route>
        <Route path="help" element={<Help />} />
        <Route path="membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
      </Route>

      {/* Admin Routes (protected) */}
      <Route path="/admin" element={
        <ProtectedRoute>
          <AdminLayout />
        </ProtectedRoute>
      }>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<UserManagement />} />
        <Route path="e-wallet" element={<AdminEWallet />} />
        <Route path="store" element={<Store />} />
        <Route path="orders" element={<OrderHistory />} />
        <Route path="profile" element={<AdminProfile />} />
        {/* Network Routes */}
        <Route path="network">
          <Route index element={<Navigate to="/admin/network/tree" replace />} />
          <Route path="tree" element={<NetworkTreeView />} />
          <Route path="referrals" element={<ReferralMembers />} />
        </Route>
        {/* Tools Routes */}
        <Route path="tools">
          <Route index element={<Navigate to="/admin/tools/upload" replace />} />
          <Route path="upload" element={<UploadMaterial />} />
          <Route path="leads" element={<ToolsLeads />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="news" element={<News />} />
          <Route path="courses" element={<AdminCourses />} />
          <Route path="webinars" element={<AdminWebinars />} />
          <Route path="calls" element={<AdminCalls />} />
          <Route path="qna" element={<AdminQnA />} />
          <Route path="resources" element={<AdminResources />} />
        </Route>
        {/* Settings Routes */}
        <Route path="settings" element={<Navigate to="/admin/settings/general" replace />} />
        <Route path="settings/general" element={<GeneralSettings />} />
        <Route path="settings/security" element={<SecuritySettings />} />
        <Route path="settings/email" element={<EmailSettings />} />
        <Route path="settings/payment" element={<PaymentSettings />} />
        <Route path="membership" element={<MembershipControls />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

export default AppRoutes; 