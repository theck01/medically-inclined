import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

import { getProjectByUrl } from 'model/store';

export function useProjectByUrl() {
  const { project, child } = useParams();
  return useMemo(
    () => project ? getProjectByUrl(project, child) : undefined,
    [project, child]
  );
};
