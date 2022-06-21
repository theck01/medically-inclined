import React from 'react';

import Card from 'components/Card';
import Text from 'components/Text';
import { useProjectByUrl } from 'hooks/byUrl';

import styles from './IllustrationGrid.module.scss';

export const IllustrationGrid: React.FC = () => {
  const project = useProjectByUrl();

  return (
    <div>
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
