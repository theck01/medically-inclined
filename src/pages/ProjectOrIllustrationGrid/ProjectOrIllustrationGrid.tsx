import React from 'react';

import Link from 'components/Link';
import Text from 'components/Text';
import { useProjectByUrl } from 'hooks/byUrl';
import { Img, Project } from 'model/types';
import IllustrationGrid from 'pages/IllustrationGrid';
import ProjectGrid from 'pages/ProjectGrid';
import styles from './ProjectOrIllustrationGrid.module.scss';

export const ProjectOrIllustrationGrid: React.FC = () => {
  const project = useProjectByUrl();
  return (
    <div className={styles['root-container']}>
      <div className={styles['heading-container']}>
        <div className={styles['desktop-navigation-control']}>
          <Link path="/projects" variant="minimal-button" > 
            <span className="material-icons">arrow_back_ios</span>
            <Text size="h6" spacing="none">All projects</Text>
          </Link>
        </div>
        <div className={styles['mobile-navigation-control']}>
          <Link path="/projects" variant="minimal-button" > 
            <span className="material-icons">arrow_back_ios</span>
          </Link>
        </div>
        <div className={styles['title']}>
          <Text size="h2" spacing="none">
            {project?.name}
          </Text>
        </div>
      </div>
      {project ? (
        project.childType === 'project' ? (
          <ProjectGrid projects={project.children as Project<Img>[]} />
        ) : (
          <IllustrationGrid illustrations={project.children as Img[]} />
        )
      ) : null}
    </div>
  );
};

export default ProjectOrIllustrationGrid;
