import React from 'react';
import { Link as BaseLink } from  'react-router-dom';
import classnames from 'classnames';

import styles from './Link.module.scss';

export type LinkVariant = 'inline' | 'button';

export interface Props {
  text: string;
  path: string;
  variant? : LinkVariant;
}

export const Link: React.FC<Props> = ({ 
  text,
  path,
  variant = 'inline',
}) => {
  const linkClassName = classnames(
    styles[`variant-${variant}`], 
  );

  return (
    <div className={linkClassName}>
      <BaseLink to={path}>{text}</BaseLink>
    </div>
  );
};

export default Link;
