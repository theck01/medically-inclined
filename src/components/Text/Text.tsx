import React from 'react';
import classnames from 'classnames';

import styles from './Text.module.scss';

type TextSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'lg' | 'md' | 'sm';
type TextAlign = 'start' | 'center' | 'end' | 'justify';
type TextSpacing = '6x' | '4x' | '3x' | '2x' | '1x' | 'half' | 'none';

export interface Props {
  readonly size?: TextSize;
  readonly align?: TextAlign;
  readonly spacing?: TextSpacing;
  readonly children?: React.ReactNode;
}

export const Text: React.FC<Props> = ({ 
  size = 'md', 
  align = 'start', 
  spacing,
  children
}) => {
  const textClassName = classnames(
    styles['base-text-style'],
    styles[`size-${size}`], 
    styles[`align-${align}`],
    styles[`spacing-${spacing ?? defaultSpacingForSize(size)}`],
  );

  switch(size) {
    case 'h1': {
      return (<h1 className={textClassName}>{children}</h1>);
    }
    default: {
      return (<p className={textClassName}>{children}</p>);
    }
  }
};

function defaultSpacingForSize(size: TextSize): TextSpacing {
  switch(size) {
    case 'h1': 
    case 'h2': {
      return '3x';
    }
    case 'h3':
    case 'h4':
    case 'h5': {
      return '2x';
    }
    default: {
      return '1x';
    }
  }
}

export default Text;
