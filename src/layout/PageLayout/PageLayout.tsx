import React from 'react';

import TabBar from 'components/TabBar';
import Text from 'components/Text';
import titleImg from 'img/title.webp';

import styles from './PageLayout.module.scss';

export interface Props {
  readonly children?: React.ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => (
  <div className={styles['page-container']}>
    <div className={styles['page-column']}>
      <div className={styles['page-header']}>
        <div>
          <img src={titleImg} alt='Illustrations for the Medically Inclined' />
        </div>
        <TabBar tabs={[
          { label: 'Projects', path: '/projects' },
          { label: 'Study tables', path: '/study-tables' },
          { label: 'About', path: '/about' },
        ]} />
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

export default PageLayout;
