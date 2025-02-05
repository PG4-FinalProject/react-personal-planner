import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Calendar from '../pages/Calendar';
import Plans from '../pages/Plans';
import Statistics from '../pages/Statistics';
import Users from '../pages/User';
import Join from '../pages/Join';
import Login from '../pages/Login';
import WeatherDetail from '../pages/Weather';
import CreatePlan from '../pages/CreatePlan.tsx';
import EditPlan from '../pages/EditPlan.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/calendar" replace />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/plans" element={<Plans />} />
      <Route path="/statistics" element={<Statistics />} />
      <Route path="/users" element={<Users />} />
      <Route path="/users/join" element={<Join />} />
      <Route path="/users/login" element={<Login />} />
      <Route path="/weather" element={<WeatherDetail />} />
      <Route path="/plans/create" element={<CreatePlan />} />
      <Route path="/plans/edit" element={<EditPlan />} />
    </Routes>
  );
};

export default AppRoutes;
