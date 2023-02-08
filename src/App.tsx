import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import DashboardPage from './pages/Dashboard';
import TablePage from './pages/Table';

const App = () => (
  <>
    <Routes>
      <Route path="*" element={<DashboardPage />} />
      <Route path="/tables/:tableId" element={<TablePage />} />
    </Routes>
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          fontFamily: 'Inter',
          fontWeight: 500,
          background: '#181B20',
          border: '1px solid #4A4F56',
          color: '#F1F6FB',
        },
      }}
    />
  </>
);

export default App;
