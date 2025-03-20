import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import VendorLogin from './VendorLogin';
import VendorDashboard from './VendorDashboard';

// Protected route component that checks if vendor is authenticated
const ProtectedVendorRoute = ({ children }) => {
  const authToken = localStorage.getItem('vendorAuthToken');
  const vendorData = localStorage.getItem('vendorData');
  
  if (!authToken || !vendorData) {
    // Redirect to login if not authenticated
    return <Navigate to="/vendors/login" replace />;
  }

  return children;
};

const VendorRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<VendorLogin />} />
      <Route 
        path="/vendor/:vendorId" 
        element={
          <ProtectedVendorRoute>
            <VendorDashboard />
          </ProtectedVendorRoute>
        } 
      />
      {/* If someone tries to access /dashboard without a vendor id */}
      {/* <Route path="/dashboard" element={<Navigate to="/vendors/login" replace />} /> */}
      {/* Default vendor route */}
      <Route index element={<Navigate to="/vendors/login" replace />} />
    </Routes>
  );
};

export default VendorRoutes;
