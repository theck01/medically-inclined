import React from 'react';

import Link from 'components/Link';
import Search from 'components/Search';
import TabBar from 'components/TabBar';
import Text from 'components/Text';
import titleImg from 'data/img/title.webp';

import styles from './PageLayout.module.scss';

export interface Props {
  readonly children?: React.ReactNode;
}

export const PageLayout: React.FC<Props> = ({ children }) => (
  <div className={styles['page-container']}>
    <div className={styles['page-column']}>
      <div className={styles['page-header']}>
        <Link path="/">
          <div>
            <img src={titleImg} alt='Illustrations for the Medically Inclined' />
          </div>
        </Link>
        <div className={styles['header-controls-container']}>
          <div className={styles['search-container']}>
            <Search />
          </div>
          <TabBar tabs={[
            { label: 'Projects', path: '/projects' },
            { label: 'About', path: '/about' },
          ]} />
        </div>
      </div>
      <div className={styles['page-body']}>
        {children}
      </div>
      <div className={styles['page-footer']}>
        <Link path="https://www.instagram.com/themedicallyinclined/" external>@themedicallyinclined</Link>
        <Text size='sm'>{`© 2018-${new Date().getFullYear()} by Caroline Chen`}</Text>
      </div>
    </div>
  </div>
);

export default PageLayout;
