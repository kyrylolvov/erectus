import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Table from './pages/Table';
import { GenericObject, loadTables } from './utils/localStorage';

const App = () => {
  const [tables, setTables] = useState<GenericObject>(loadTables() ?? {});

  return (
    <Routes>
      <Route path="*" element={<Main tables={tables} setTables={setTables} />} />
      <Route path="/tables/:tableId" element={<Table tables={tables} setTables={setTables} />} />
    </Routes>
  );
};

export default App;
