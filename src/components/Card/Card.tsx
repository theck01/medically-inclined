import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

export interface Props {
  padding?: 'default' | 'none';
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ 
  padding = 'default',
  children 
}) => (
  <div className={classnames(styles['card'], styles[`padding-${padding}`])}>
    {children}
  </div>
);

export default Card;
