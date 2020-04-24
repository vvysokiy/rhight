import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { useResize } from '@rhight/use-scroll-resize';
import { IHelloWorld } from '@rhight/hello-world';

import IconCheckbox from './svg/checkbox.svg';

import s from './styles.css';

/** HelloWorld - тестовый компонент в репозитории. Новые создаются по аналогии */
const HelloWorld: React.FC<IHelloWorld> = ({
  active = true,
}) => {
  const [activeBtn, toggle] = useState(active);

  const onClick = useCallback(() => toggle(!activeBtn), [activeBtn]);

  useResize(() => {
    console.log('hello bro!!!!');
  });

  return (
    <div className={s.root}>
      <button
        type="button"
        onClick={onClick}
      >
        HelloWorld
      </button>
      <IconCheckbox className={cn(s.icon, { [s['icon--active']]: activeBtn })} />
    </div>
  );
};

export default HelloWorld;
