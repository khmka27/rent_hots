import { Outlet, Navigate } from 'react-router-dom';
import React from 'react';

export default function ProtectedRouter({ children, isAllowed, redirect = '/' }) {
  if (!isAllowed) return <Navigate to={redirect} replace />;
  return children || <Outlet />;
}
