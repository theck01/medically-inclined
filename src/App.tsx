import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import { projects } from 'model/store';
import PageLayout from 'layout/PageLayout';
import IllustrationOverlay from 'layout/IllustrationOverlay';
import About from 'pages/About';
import ProjectGrid from 'pages/ProjectGrid';
import ProjectOrIllustrationGrid from 'pages/ProjectOrIllustrationGrid';

function App() {
  return (
    <BrowserRouter>
      <IllustrationOverlay>
        <PageLayout>
          <Routes>
            <Route path="/about" element={<About />} />
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
      </IllustrationOverlay>
    </BrowserRouter>
  );
}

export default App;
