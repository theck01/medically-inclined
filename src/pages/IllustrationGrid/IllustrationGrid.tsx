import React from 'react';
import { useLocation } from 'react-router-dom';

import Card from 'components/Card';
import Link from 'components/Link';
import Text from 'components/Text';
import { publicUrlForImg, urlFormat } from 'helpers/url';
import { Img } from 'model/types';

import styles from './IllustrationGrid.module.scss';

export interface Props {
  readonly illustrations: Img[];
}

export const IllustrationGrid: React.FC<Props> = ({ illustrations }) => {
  const location = useLocation();

  return (
    <div className={styles['root-container']}>
      <div className={styles['illustrations-container']}>
        {illustrations.map((img: Img) => (
          <Link 
            path={`${location.pathname}?show=${urlFormat(img.name)}`} 
            key={img.name}
          >
            <Card padding="none">
              <div className={styles['illustration-card']}>
                <img src={publicUrlForImg(img.fileName.small)} alt={img.name} />
                <div className={styles['title']}>
                  <Text size="h5" spacing="none">{img.name}</Text>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default IllustrationGrid;
