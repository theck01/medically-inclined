import React from 'react';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';

import { publicUrlForImg, urlFormat } from 'helpers/url';
import store from 'model/store';

import styles from './Projects.module.scss';

export const Projects: React.FC = () => (
  <div className={styles['projects-container']}>
    {store.projects.map((p) => (
      <Link path={`/projects/${urlFormat(p.name)}`} key={p.name}>
        <Card padding="none">
          <div className={styles['project-card']}>
            <div className={styles['cover-image']}>
              <img 
                src={publicUrlForImg(p.coverImg.fixed.fileName)} 
                alt={p.coverImg.fixed.altText} 
              />
            </div>
            <div className={styles['animated-image']}>
              <img 
                src={publicUrlForImg(p.coverImg.gif.fileName)} 
                alt={p.coverImg.gif.altText} 
              />
            </div>
            <Text size="h4" spacing="none">{p.name}</Text>
          </div>
        </Card>
      </Link>
    ))}
  </div>
);

export default Projects;
