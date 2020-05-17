import React, { useCallback } from 'react';

import { IToggle } from '@rhight/toggle';

import cn from 'classnames';

import s from './styles.css';

const Toggle: React.FC<IToggle> = ({
  checked,
  onChange,
  isDisabled = false,
  label = '',
  isMobile = false,
}) => {
  const onChangeLocal = useCallback(
    (event) => {
      const newValue = !(event.target as HTMLInputElement).checked;
      onChange(newValue, event);
    },
    [onChange],
  );

  return (
    <div className={s.root}>
      <label className={s.label}>
        <input
          type="checkbox"
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
