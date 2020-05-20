import React from 'react';
import cn from 'classnames';
import { IPrevNextBtn } from '@rhight/swiper';

import IconArrow from '../svg/arrow.svg';

import s from './styles.css';

export const PrevNextBtn: React.FC<IPrevNextBtn> = React.memo(({
  currentIndex,
  children,
  goToSlide,
  prevBtnClassName,
  nextBtnClassName,
}) => {
  const handlePrevClick = (event) => {
    event.stopPropagation();
    goToSlide(currentIndex - 1);
  };
  const handleNextClick = (event) => {
    event.stopPropagation();
    goToSlide(currentIndex + 1);
  };

  return (
    <>
      <div
        className={cn(s.btnWrapper, s.btnWrapper_prev, prevBtnClassName)}
        style={currentIndex === 0 ? { display: 'none' } : null}
      >
        <button
          type="button"
          className={s.btn}
          onClick={handlePrevClick}
        >
          prev
        </button>
        <IconArrow className={cn(s.icon, s.icon_prev)} />
      </div>
      <div
        className={cn(s.btnWrapper, s.btnWrapper_next, nextBtnClassName)}
        style={currentIndex === children.length - 1 ? { display: 'none' } : null}
      >
        <button
          type="button"
          className={s.btn}
          onClick={handleNextClick}
        >
          next
        </button>
        <IconArrow className={cn(s.icon, s.icon_next)} />
      </div>
    </>
  );
});
