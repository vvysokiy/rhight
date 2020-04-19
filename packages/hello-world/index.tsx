import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import IconCheckbox from './svg/checkbox.svg';

import s from './styles.css';

export const HelloWorld = () => {
  const [active, toggle] = useState(false);

  const onClick = useCallback(() => {
    console.log('onClick -> active', active);
    toggle(!active);
  }, [active]);

  return (
    <div className={s.root}>
      <button
        type="button"
        onClick={onClick}
      >
        HelloWorld
      </button>
      <IconCheckbox className={cn(s.icon, { [s['icon--active']]: active })} />
    </div>
  );
};
