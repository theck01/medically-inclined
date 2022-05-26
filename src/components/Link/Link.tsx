import React from 'react';
import { Link as BaseLink } from  'react-router-dom';
import classnames from 'classnames';

import styles from './Link.module.scss';

export type LinkVariant = 'inline' | 'button' | 'minimal-button';

export interface Props {
  readonly path: string;
  readonly variant? : LinkVariant;
  readonly external?: boolean;
  readonly children?: React.ReactNode;
}

export const Link: React.FC<Props> = ({ 
  path,
  variant = 'inline',
  external,
  children
}) => {
  const linkClassName = classnames(
    styles[`variant-${variant}`], 
  );

  return (
    <div className={linkClassName}>
      {external ? (
        <a href={path} target="_blank" rel="noreferrer">{children}</a>
      ) : (
        <BaseLink to={path}>{children}</BaseLink>
      )}
    </div>
  );
};

export default Link;
