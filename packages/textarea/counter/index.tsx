import React from 'react';
import cn from 'classnames';

import { ICounter } from '@rhight/textarea';

import s from './styles.css';

const counter = (text: string) => {
  if (text.length > 0) {
    const newStr = text.replace(/(^\s*)|(\s*$)/gi, '')
      .replace(/[ ]{2,}/gi, ' ')
      .replace(/\n /, '\n');
    return newStr.split(' ').length;
  } return 0;
};

export const Counter: React.FC<ICounter> = ({
  value = '',
  counterType = 'none',
  isMobile = false,
}) => {
  const letterCounter = value.length;
  const wordCounter = counter(value);

  return (
    <div className={cn(
      s.counter,
      { [s.counterMobile]: isMobile },
    )}
    >
      {counterType === 'words' && (
        <div className={s.value}>{wordCounter}</div>
      )}
      {counterType === 'symbols' && (
        <div className={s.value}>{letterCounter}</div>
      )}
    </div>
  );
};
