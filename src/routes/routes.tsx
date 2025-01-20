import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Calendar from '../pages/Calendar'; // Calendar 경로를 맞춰주세요.
// import CreatePlans from '../pages/CreatePlans';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Calendar />} /> {/* 기본 경로에서 캘린더 페이지 표시 */}
      {/* <Route path="/createPlans" element={<CreatePlans />} /> */}
      {/* 다른 페이지를 추가하려면 여기에 Route를 추가 */}

    </Routes>
  );
};

export default AppRoutes;
