import React from 'react';
import { useParams } from 'react-router-dom';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';

import styles from './ProjectIllustrations.module.scss';

export const ProjectIllustrations: React.FC = () => {
  const { name } = useParams();

  return (
    <div>
      <div className={styles['go-back-container']}>
        <Link path="/projects" variant="minimal-button" > 
          <Text size="h5" spacing="none">
            &lt; All projects
          </Text>
        </Link>
      </div>
      <div className={styles['illustrations-container']}>
        <Card>
          <Text spacing="none">A {name} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Another {name} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Yet another {name} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Even more {name} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Even more {name} illustrations</Text>
        </Card>
      </div>
    </div>
  );
};

export default ProjectIllustrations;
