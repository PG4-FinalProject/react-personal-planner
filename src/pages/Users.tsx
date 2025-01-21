import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.

const Users: React.FC = () => {
  return (
    <MainLayout>
      <h1>프로필 페이지</h1>
      <p>여기에 프로필 관련 콘텐츠를 추가하세요.</p>
      {/* 프로필 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}
    </MainLayout>
  );
};

export default Users;