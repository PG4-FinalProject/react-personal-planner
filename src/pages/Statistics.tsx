import React from 'react';
import MainLayout from '../components/layout/MainLayout'; // MainLayout 경로를 맞춰주세요.
import ContentUIBox from '../components/layout/ContentUIBox';
import { palette } from '../styles/palette';

const Statistics: React.FC = () => {
  return (
    <MainLayout>
      <ContentUIBox bgColor={palette.white}>
        <h1>통계 페이지</h1>
        <p>여기에 통계 관련 콘텐츠를 추가하세요.</p>
        {/* 통계 컴포넌트나 기능을 여기에 추가할 수 있습니다. */}
      </ContentUIBox>
    </MainLayout>
  );
};

export default Statistics;
