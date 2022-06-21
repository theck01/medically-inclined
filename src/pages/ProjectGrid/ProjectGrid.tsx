import React from 'react';
import { useLocation } from 'react-router-dom';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';

import { publicUrlForImg, urlFormat } from 'helpers/url';
import { Project, Img } from 'model/types';

import styles from './ProjectGrid.module.scss';

export interface Props {
  readonly projects: Project<Img>[];
}

export const ProjectGrid: React.FC<Props> = ({ projects }) => {
  const location = useLocation();
  return (
    <div className={styles['projects-container']}>
      {projects.map((p) => (
        <Link path={`${location.pathname}/${urlFormat(p.name)}`} key={p.name}>
          <Card padding="none">
            <div className={styles['project-card']}>
              {p.coverImg.gif && (
                <div className={styles['animated-image']}>
                  <img 
                    src={publicUrlForImg(p.coverImg.gif.fileName)} 
                    alt={p.coverImg.gif.altText} 
                  />
                </div>
              )}
              <div className={styles['cover-image']}>
                <img 
                  src={publicUrlForImg(p.coverImg.fixed.fileName)} 
                  alt={p.coverImg.fixed.altText} 
                />
              </div>
              <div className={styles['title']}>
                <Text size="h4" spacing="none">{p.name}</Text>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ProjectGrid;
