import React from 'react';
import cn from 'classnames';
import { IPagination } from '@rhight/swiper';

import s from './styles.css';

export const Pagination: React.FC<IPagination> = React.memo(({
  children,
  transition,
  currentIndex,
}) => (
  <div className={s.root}>
    <div
      className={cn(s.feed)}
      style={{
        transition,
        transform: `translate3d(${currentIndex * (-18)}px, 0, 0)`,
      }}
    >
      {children.map((node, index) => (
        <div
          key={index} // eslint-disable-line react/no-array-index-key
          style={{ transition }}
          className={cn(s.dot, {
            [s.dot_active]: index === currentIndex,
            [s.dot_next]: index === currentIndex - 1,
            [s.dot_prev]: index === currentIndex + 1,
          })}
        />
      ))}
    </div>
  </div>
));
