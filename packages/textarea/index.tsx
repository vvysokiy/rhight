import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { ITextarea } from '@rhight/textarea';

import s from './styles.css';

const Textarea: React.FC<ITextarea> = ({
  value,
  onChange,
  header = '',
  placeholder = '',
  isMobile = false,
  isDisabled = false,
  counter = '',
}) => {
  const [focused, setFocused] = useState(false);

  const changeFocus = useCallback(
    (val: boolean): void => { setFocused(val); }, [],
  );

  const onChangeLocal = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={s.root}>
      <div className={cn(s.header, { [s.headerMobile]: isMobile })}>{header}</div>
      <div className={cn(
        s.wrapper,
        { [s.wrapperFocused]: focused },
        { [s.wrapperMobile]: isMobile },
      )}
      >
        <textarea
          rows={2}
          value={value}
          className={cn(
            s.textarea,
            { [s.textareaMobile]: isMobile },
            { [s.textareaWithCounter]: counter },
          )}
          onChange={onChangeLocal}
          onClick={() => changeFocus(true)}
          onBlur={() => changeFocus(false)}
          placeholder={placeholder}
          disabled={isDisabled}
        />
        {counter && (
          <div className={cn(s.counter, { [s.counterMobile]: isMobile })}>
            <span>{counter}</span>
          </div>
        )}
      </div>
      <div className={cn(s.underline,
        { [s.underlineFocused]: focused })}
      />
    </div>
  );
};

export default Textarea;
