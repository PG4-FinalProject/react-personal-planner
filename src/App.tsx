import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routing'; // routes 경로
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './apis/queryClient';

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes /> {/* 라우트 컴포넌트 사용 */}
      </Router>
    </QueryClientProvider>
  );
};

export default App;
