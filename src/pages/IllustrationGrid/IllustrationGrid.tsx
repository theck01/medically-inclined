import React from 'react';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';
import { useProjectByUrl } from 'hooks/byUrl';

import styles from './IllustrationGrid.module.scss';

export const IllustrationGrid: React.FC = () => {
  const project = useProjectByUrl();

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
          <Text spacing="none">A {project?.name ?? 'unknown'} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Another {project?.name ?? 'unknown'} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Yet another {project?.name ?? 'unknown'} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Even more {project?.name ?? 'unknown'} illustrations</Text>
        </Card>
        <Card>
          <Text spacing="none">Even more {project?.name ?? 'unknown'} illustrations</Text>
        </Card>
      </div>
    </div>
  );
};

export default IllustrationGrid;
