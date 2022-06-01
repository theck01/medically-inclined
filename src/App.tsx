import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Text from 'components/Text';
import PageLayout from 'layout/PageLayout';
import About from 'pages/About';
import Projects from 'pages/Projects';
import StudyTables from 'pages/StudyTables';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/study-tables" element={<StudyTables />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
