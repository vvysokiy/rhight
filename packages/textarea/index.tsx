import React, { useCallback } from 'react';
import cn from 'classnames';

import { ITextarea } from '@rhight/textarea';
import { Counter } from '@rhight/textarea/counter';

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
    (event) => {
      const newValue = (event.target as HTMLInputElement).value;
      onChange(newValue, event);
    },
    [onChange],
  );

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
      {counterType === 'none'
        ? null
        : <Counter value={value} counterType={counterType} isMobile={isMobile} />}
    </div>
  );
};

export default Textarea;
