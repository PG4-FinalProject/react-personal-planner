import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Plans from '../pages/Plans';
import Statistics from '../pages/Statistics';
import Users from '../pages/Users';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calendar" replace />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};

export default AppRoutes;