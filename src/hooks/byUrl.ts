import { useMemo } from 'react';
import { useMatch } from 'react-router-dom';

import { getProjectByUrl } from 'model/store';

export function useProjectByUrl() {
  const projectMatch = useMatch('/projects/:project');
  const subProjectMatch = useMatch('/projects/:project/:subProject');

  const project = subProjectMatch?.params.project ?? projectMatch?.params.project;
  const subProject = subProjectMatch?.params.subProject;

  return useMemo(
    () => project ? getProjectByUrl(project, subProject) : undefined,
    [project, subProject]
  );
};
