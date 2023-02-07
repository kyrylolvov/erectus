import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardPage from './pages/Dashboard';
import TablePage from './pages/Table';

const App = () => (
  <Routes>
    <Route path="*" element={<DashboardPage />} />
    <Route path="/tables/:tableId" element={<TablePage />} />
  </Routes>
);

export default App;
