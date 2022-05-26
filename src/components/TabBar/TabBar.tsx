import React from 'react';
import { useMatch } from 'react-router-dom';
import classnames from 'classnames';

import Link from 'components/Link';

import styles from './TabBar.module.scss';

export interface Props {
  readonly tabs: Array<{ label: string, path: string }>;
}

export const TabBar: React.FC<Props> = ({ tabs }) => (
  <div className={styles['tab-bar']}>
    { tabs.map((t) => (<Tab label={t.label} path={t.path} key={t.label} />)) }
  </div>
);

export default TabBar;


interface TabProps {
  readonly label: string;
  readonly path: string;
}

const Tab: React.FC<TabProps> = ({ label, path }) => {
  const pathMatch = useMatch(path);

  const className = classnames(
    styles['tab'], 
    { [styles['active']]: !!pathMatch }
  );
  
  return (
    <div className={className}>
      <Link path={path} variant='minimal-button' >{label}</Link>
      <div className={styles['active-indicator']} />
    </div>
  );
};
