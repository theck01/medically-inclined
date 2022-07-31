import React from 'react';
import classnames from 'classnames';

import styles from './Card.module.scss';

export interface Props {
  padding?: 'default' | 'none';
  disableClickAnimation?: boolean; 
  children: React.ReactNode;
}

export const Card: React.FC<Props> = ({ 
  padding = 'default',
  disableClickAnimation,
  children 
}) => (
  <div className={
    classnames(
      styles['card'], 
      styles[`padding-${padding}`], 
      { [styles['no-click']]: disableClickAnimation }
    )
  }>
    {children}
  </div>
);

export default Card;
