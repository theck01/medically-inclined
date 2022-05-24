import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Text from 'components/Text';
import titleImg from 'img/title.webp';

import styles from './PageLayout.module.scss';

export interface Props {
  readonly children?: React.ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate(); 

  const goToProjects = useCallback(() => {
    navigate('/projects');
  }, [navigate]);
  const goToStudyTables = useCallback(() => {
    navigate('/study-tables');
  }, [navigate]);
  const goToAbout = useCallback(() => {
    navigate('/about');
  }, [navigate]);


  return (
    <div className={styles['page-container']}>
      <div className={styles['page-column']}>
        <div className={styles['page-header']}>
          <div>
            <img src={titleImg} alt='Illustrations for the Medically Inclined' />
          </div>
          <div>
            <div className={styles['page-selector']}>
              <Button label="Projects" click={goToProjects} variant="minimal" />
              <Button label="Study tables" click={goToStudyTables} variant="minimal" />
              <Button label="About" click={goToAbout} variant="minimal" />
            </div>
          </div>
        </div>
        <div className={styles['page-body']}>
          {children}
        </div>
        <div className={styles['page-footer']}>
          <Text size='sm'>{`© 2018-${new Date().getFullYear()} by Caroline Chen`}</Text>
          <Text size='sm'>@illustrationsforthemedicallyinclined</Text>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
