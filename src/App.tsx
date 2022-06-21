import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { projects } from 'model/store';
import PageLayout from 'layout/PageLayout';
import About from 'pages/About';
import ProjectGrid from 'pages/ProjectGrid';
import ProjectOrIllustrationGrid from 'pages/ProjectOrIllustrationGrid';
import StudyTables from 'pages/StudyTables';

function App() {
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path="/about" element={<About />} />
          <Route path="/study-tables" element={<StudyTables />} />
          <Route 
            path="/projects" 
            element={<ProjectGrid projects={projects} />}
          />
          <Route 
            path="/projects/:project" 
            element={<ProjectOrIllustrationGrid />}
          />
          <Route path="/" element={<Navigate to="/projects" replace />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>
  );
}

export default App;
