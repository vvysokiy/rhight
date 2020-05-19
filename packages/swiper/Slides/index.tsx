import React from 'react';
import { ISlides } from '@rhight/swiper';

import s from './styles.css';

export const Slides: React.FC<ISlides> = React.memo(({
  children,
  slideNodeList,
}) => (
  <div className={s.root}>
    {children.map((reactNode: React.ReactNode, index: number) => (
      <div
        key={index} // eslint-disable-line react/no-array-index-key
        ref={(node: HTMLDivElement) => { if (node) slideNodeList.push(node); }}
        className={s.slide}
      >
        {reactNode}
      </div>
    ))}
  </div>
));
