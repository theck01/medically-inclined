import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Text from 'components/Text';
import PageLayout from 'layout/PageLayout';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/about" element={<Text size="h1">About</Text>} />
          <Route 
            path="/study-tables" 
            element={<Text size="h1">Study Tables</Text>} 
          />
          <Route path="/projects" element={<Text size="h1">Projects</Text>} />
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
