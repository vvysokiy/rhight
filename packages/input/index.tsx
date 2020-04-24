import React, { useCallback } from 'react';
import cn from 'classnames';

import { IInput } from '@rhight/input';

import s from './styles.css';

const Input: React.FC<IInput> = ({
  value,
  onChange,
  size = 'default',
  label,
  placeholder,
  type = 'text',
  isDisabled = false,
}) => {
  const onLocalChange = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = (e.target as HTMLInputElement).value;
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={s.wrapper}>
      <label className={cn(s.label, { [s.disabledLabel]: isDisabled })}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        className={cn(s.input, s[size])}
        onChange={onLocalChange}
        placeholder={placeholder}
        disabled={isDisabled}
      />
      <div className={s.inputUnderline} />
    </div>
  );
};

export default Input;
