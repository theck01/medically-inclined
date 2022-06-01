import React from 'react';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';

import { urlFormat } from 'helpers/url';

import clerkshipImg from 'data/img/clerkship.gif'
import stepImg from 'data/img/step-1.gif'
import ms2Img from 'data/img/ms2.gif'
import ms1Img from 'data/img/ms1.gif'
import anatomyImg from 'data/img/anatomy.gif'

import styles from './Projects.module.scss';

const projects = [
  { name: 'Clerkship', img: clerkshipImg },
  { name: 'Step 1', img: stepImg },
  { name: 'MS2', img: ms2Img },
  { name: 'MS1', img: ms1Img },
  { name: 'Anatomy', img: anatomyImg },
];

export const Projects: React.FC = () => (
  <div className={styles['projects-container']}>
    {projects.map((p) => (
      <Link path={`/projects/${urlFormat(p.name)}`} key={p.name}>
        <Card padding="none">
          <div className={styles['project-card']}>
            <img src={p.img} alt={p.name} />
            <Text size="h4" spacing="none">{p.name}</Text>
          </div>
        </Card>
      </Link>
    ))}
  </div>
);

export default Projects;
