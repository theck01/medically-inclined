import React from 'react';

import Text from 'components/Text';

import styles from './PageLayout.module.scss';

export interface Props {
  readonly children?: React.ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => (
  <div className={styles['page-container']}>
    <div className={styles['page-header']}>
      <Text size='h2'>Page header</Text>
    </div>
    <div className={styles['page-body']}>
      {children}
    </div>
    <div className={styles['page-footer']}>
      <Text size='sm'>{`© 2018-${new Date().getFullYear()} by Caroline Chen`}</Text>
      <Text size='sm'>@illustrationsforthemedicallyinclined</Text>
    </div>
  </div>
);

export default PageLayout;
