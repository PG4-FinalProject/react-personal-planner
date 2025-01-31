import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routing'; // routes 경로
import './index.css'; // 필요한 경우 CSS 파일을 추가

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes /> {/* 라우트 컴포넌트 사용 */}
    </Router>
  );
};

export default App;
