import React from 'react';
import classnames from 'classnames';

import styles from './Button.module.scss';

export type ButtonVariant = 'default' | 'minimal';

export interface Props {
  label: string;
  icon?: string;
  click?: () => void;
  variant? : ButtonVariant;
}

export const Button: React.FC<Props> = ({ 
  label,
  icon,
  click,
  variant = 'default',
}) => {
  const buttonClassName = classnames(
    styles['base-button-style'],
    styles[`variant-${variant}`], 
  );

  return (
    <button className={buttonClassName} type="button" onClick={click}>
      {icon ? (<span className="material-icons">{icon}</span>) : undefined} {label}
    </button>
  );
};

export default Button;
