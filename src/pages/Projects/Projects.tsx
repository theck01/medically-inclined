import React from 'react';

import Card from 'components/Card';
import Text from 'components/Text';

import clerkshipImg from 'data/img/clerkship.gif'
import stepImg from 'data/img/step-1.gif'
import ms2Img from 'data/img/ms2.gif'
import ms1Img from 'data/img/ms1.gif'
import anatomyImg from 'data/img/anatomy.gif'

import styles from './Projects.module.scss';

export const Projects: React.FC = () => (
  <div className={styles['projects-container']}>
    <Card padding="none">
      <div className={styles['project-card']}>
        <img src={clerkshipImg} alt="Clerkship" />
        <Text size="h4" spacing="none">Clerkship</Text>
      </div>
    </Card>

    <Card padding="none">
      <div className={styles['project-card']}>
        <img src={stepImg} alt="Step 1" />
        <Text size="h4" spacing="none">Step 1</Text>
      </div>
    </Card>

    <Card padding="none">
      <div className={styles['project-card']}>
        <img src={ms2Img} alt="MS2" />
        <Text size="h4" spacing="none">MS2</Text>
      </div>
    </Card>

    <Card padding="none">
      <div className={styles['project-card']}>
        <img src={ms1Img} alt="MS1" />
        <Text size="h4" spacing="none">MS1</Text>
      </div>
    </Card>

    <Card padding="none">
      <div className={styles['project-card']}>
        <img src={anatomyImg} alt="Anatomy" />
        <Text size="h4" spacing="none">Anatomy</Text>
      </div>
    </Card>
  </div>
);

export default Projects;
