import React from 'react';

import s from './styles.css';

export interface ITitle {
  /** Флаг отображения звездочки */
  require?: boolean
  /** Значение заголовка */
  children?: string
}

export const Title: React.FC<ITitle> = ({
  children = '',
  require = false,
}) => {
  if (!children || typeof children !== 'string') {
    return null;
  }

  return (
    <div className={s.title}>
      {children}
      {require && (
        <span className={s.require}> *</span>
      )}
    </div>
  );
};
