import React, { useMemo, useCallback } from 'react';
import cn from 'classnames';

import { ITextarea } from '@rhight/textarea';

import s from './styles.css';

const Textarea: React.FC<ITextarea> = ({
  value,
  onChange,
  counterType = 'none',
  header = '',
  placeholder = '',
  isMobile = false,
  isDisabled = false,
}) => {
  const onChangeLocal = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
    },
    [onChange],
  );

  const letterCounter = useCallback((val: string) => val.length, []);

  const letterCounterMemo = useMemo(() => letterCounter(value), [value, letterCounter]);

  const wordCounter = useCallback((val: string) => {
    if (val.length > 0) {
      const newStr = val.replace(/(^\s*)|(\s*$)/gi, '')
        .replace(/[ ]{2,}/gi, ' ')
        .replace(/\n /, '\n');
      return newStr.split(' ').length;
    } return 0;
  }, []);

  const wordCounterMemo = useMemo(() => wordCounter(value), [value, wordCounter]);

  return (
    <div className={cn(
      s.wrapper,
      { [s.wrapperMobile]: isMobile },
    )}
    >
      <div className={cn(s.header, { [s.headerMobile]: isMobile })}>{header}</div>
      <textarea
        rows={2}
        value={value}
        className={cn(
          s.textarea,
          { [s.textareaMobile]: isMobile },
        )}
        onChange={onChangeLocal}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <div className={s.underline} />
      {counterType === 'words' && (
        <div className={cn(s.counter, { [s.counterMobile]: isMobile })}>
          <span>{wordCounterMemo}</span>
        </div>
      )}
      {counterType === 'symbols' && (
        <div className={cn(s.counter, { [s.counterMobile]: isMobile })}>
          <span>{letterCounterMemo}</span>
        </div>
      )}
    </div>
  );
};

export default Textarea;
