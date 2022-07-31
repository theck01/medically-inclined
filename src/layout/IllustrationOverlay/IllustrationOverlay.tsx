import React, { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';

import Button from 'components/Button';
import Card from 'components/Card';
import { useProjectByUrl } from 'hooks/byUrl';
import { publicUrlForImg, urlFormat } from 'helpers/url';
import { Img } from 'model/types';

import styles from './IllustrationOverlay.module.scss';

export interface Props {
  readonly children?: React.ReactNode;
}

export const IllustrationOverlay: React.FC<Props> = ({ children }) => {
  const project = useProjectByUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const illustration = useMemo(() => {
    if (!searchParams.has('show')) {
      return undefined;
    }
    const paramName = searchParams.get('show');
    return project?.childType === 'illustration' 
      ? (project.children as Img[]).find(i => urlFormat(i.name) === paramName)
      : undefined;
  }, [searchParams, project]);

  const hideOverlay = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const containerClassName = classNames(
    styles['container'], 
    { [styles['show-overlay']]: !!illustration }
  );

  return (
    <div className={containerClassName}>
      <div className={styles['contents-container']}>{children}</div>
      <div className={styles['overlay-container']} onClick={hideOverlay}>
        {illustration && (
          <Card disableClickAnimation>
            <div className={styles['illustration-container']}>
              <img 
                src={publicUrlForImg(illustration.fileName.full)} 
                alt={illustration.altText} 
              />
              <div className={styles['close-container']}> 
                <Button 
                  label="close" 
                  icon="close" 
                  click={hideOverlay} 
                  variant="minimal" 
                  iconOnly
                />
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default IllustrationOverlay;
