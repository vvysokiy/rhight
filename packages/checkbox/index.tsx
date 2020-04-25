import React, { useCallback } from 'react';

import { ICheckbox } from '@rhight/checkbox';

import s from './styles.css';

const Checkbox: React.FC<ICheckbox> = ({
  checked,
  onChange,
  isDisabled = false,
  label = '',
}) => {
  const onLocalChange = useCallback(
    (e: React.SyntheticEvent) => {
      const newValue = !(e.target as HTMLInputElement).checked;
      onChange(newValue);
    },
    [onChange],
  );

  return (
    <div className={s.wrapper}>
      <input type="checkbox" className={s.checkbox} checked={checked} onChange={onLocalChange} disabled={isDisabled} id="custom-checkbox" />
      <label htmlFor="custom-checkbox" className={s.label}>{label}</label>
    </div>
  );
};

export default Checkbox;
