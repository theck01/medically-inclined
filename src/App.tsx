import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { projects } from 'model/store';
import PageLayout from 'layout/PageLayout';
import About from 'pages/About';
import Projects from 'pages/Projects';
import ProjectIllustrations from 'pages/ProjectIllustrations';
import StudyTables from 'pages/StudyTables';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/study-tables" element={<StudyTables />} />
          <Route path="/projects" element={<Projects projects={projects} />} />
          <Route path="/projects/:project" element={<ProjectIllustrations />} />
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
