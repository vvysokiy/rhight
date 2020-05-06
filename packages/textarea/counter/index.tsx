import React, { useMemo, useCallback } from 'react';
import cn from 'classnames';

import { ICounter } from '@rhight/counter';

import s from './styles.css';

const counter = (val: string) => {
  if (val.length > 0) {
    const newStr = val.replace(/(^\s*)|(\s*$)/gi, '')
      .replace(/[ ]{2,}/gi, ' ')
      .replace(/\n /, '\n');
    return newStr.split(' ').length;
  } return 0;
};

const Counter: React.FC<ICounter> = ({
  value = '',
  counterType = 'none',
  isMobile = false,
}) => {
  const letterCounter = useCallback((val: string) => val.length, []);

  const letterCounterMemo = useMemo(() => letterCounter(value), [value, letterCounter]);

  const wordCounter = useCallback((str: string) => counter(str), []);

  const wordCounterMemo = useMemo(() => wordCounter(value), [value, wordCounter]);

  return (
    <div className={cn(
      s.counter,
      { [s.counterMobile]: isMobile },
    )}
    >
      {counterType === 'words' && (
        <div>{wordCounterMemo}</div>
      )}
      {counterType === 'symbols' && (
        <div>{letterCounterMemo}</div>
      )}
    </div>
  );
};

export default Counter;
