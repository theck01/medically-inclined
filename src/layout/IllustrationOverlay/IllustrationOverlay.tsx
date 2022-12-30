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
  const { project } = useProjectByUrl();
  const [searchParams, setSearchParams] = useSearchParams();

  const illustration = useMemo(() => {
    if (!searchParams.has('show')) {
      return undefined;
    }
    const paramName = searchParams.get('show');
    return project?.childType === 'img' 
      ? (project.children as Img[]).find(i => urlFormat(i.name) === paramName)
      : undefined;
  }, [searchParams, project]);

  const { viewNext, viewPrev } = useMemo(() => {
    if (!project || !illustration) {
      return {};
    }
    const i = (project.children as Img[]).findIndex(
      img => img.id === illustration.id
    );
    return {
      viewNext: i < project.children.length - 1
        ? () => {
          setSearchParams({ show: urlFormat(project.children[i + 1].name) });
        } : undefined,
      viewPrev: i > 0
        ? () => {
          setSearchParams({ show: urlFormat(project.children[i - 1].name) });
        } : undefined,
    };
  }, [project, illustration, setSearchParams]);

  const hideOverlay = useCallback(() => {
    setSearchParams({});
  }, [setSearchParams]);

  const hideOnEscape = useCallback((e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === 'Escape') {
      hideOverlay();
    }
  }, [hideOverlay]);

  const containerClassName = classNames(
    styles['container'], 
    { [styles['show-overlay']]: !!illustration }
  );

  return (
    <div className={containerClassName} onKeyUp={hideOnEscape}>
      <div className={styles['contents-container']}>{children}</div>
      <div className={styles['overlay-container']}>
        {illustration && (
          <div className={styles['overlay-layout-container']}>
            <div className={styles['controls-container']}>
              <div className={styles['slideshow-controls']}>
                {viewPrev ? (
                  <Button 
                    label="previous" 
                    icon="arrow_back_ios" 
                    iconOnly
                    click={viewPrev} 
                    variant="minimal-light"
                  />
                ) : (
                  <div className={styles['space-for-button']} />
                )}
                {viewNext ? (
                  <Button 
                    label="next" 
                    icon="arrow_forward_ios" 
                    iconOnly
                    click={viewNext} 
                    variant="minimal-light"
                  />
                ) : (
                  <div className={styles['space-for-button']} />
                )}
              </div>

              <div className={styles['download-button']}>
                <a 
                  href={publicUrlForImg(illustration.fileName.full)} 
                  download={illustration.name} 
                  target="_blank"
                  rel="noreferrer"
                >
                  <Button
                    label="Download"
                    icon="download"
                    variant="minimal-light"
                  />
                </a>
              </div>

              <Button 
                label="close" 
                icon="close" 
                iconOnly
                click={hideOverlay} 
                variant="minimal-light"
              />
            </div>

            <div className={styles['illustration-container']}>
              <Card padding="none" disableClickAnimation>
                <img 
                  src={publicUrlForImg(illustration.fileName.full)} 
                  alt={illustration.altText} 
                />
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IllustrationOverlay;
