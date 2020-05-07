import React, { useCallback } from 'react';

import { IToggle } from '@rhight/toggle';

import cn from 'classnames';

import s from './styles.css';

const Toggle: React.FC<IToggle> = ({
  checked,
  onChange,
  isDisabled = false,
  label = '',
  type = 'checkbox',
  isMobile = false,
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
        <div className={cn(s.customCheckbox, { [s.mobile]: isMobile })} />
        <div className={s.labelText}>{label}</div>
      </label>
    </div>
  );
};

export default Toggle;
