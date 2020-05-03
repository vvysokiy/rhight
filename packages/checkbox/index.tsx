import React, { useCallback } from 'react';

import { ICheckbox } from '@rhight/checkbox';

import s from './styles.css';

const Checkbox: React.FC<ICheckbox> = ({
  checked,
  onChange,
  isDisabled = false,
  label = '',
  type = 'checkbox',
}) => {
  const onChangeLocal = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = !(e.target as HTMLInputElement).checked;
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={s.root}>
      <label className={s.label}>
        <input
          type={type}
          className={s.checkbox}
          checked={checked}
          onChange={onChangeLocal}
          disabled={isDisabled}
        />
        <div className={s.customCheckbox} />
        <div className={s.labelText}>{label}</div>
      </label>
    </div>
  );
};

export default Checkbox;
