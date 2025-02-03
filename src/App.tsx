import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/Routing'; // routes 경로
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const App: React.FC = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AppRoutes /> {/* 라우트 컴포넌트 사용 */}
      </Router>
    </QueryClientProvider>
  );
};

export default App;
