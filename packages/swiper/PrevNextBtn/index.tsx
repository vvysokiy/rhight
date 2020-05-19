import React from 'react';
import cn from 'classnames';
import { IPrevNextBtn } from '@rhight/swiper';

import s from './styles.css';

export const PrevNextBtn: React.FC<IPrevNextBtn> = React.memo(({
  currentIndex,
  children,
  goToSlide,
}) => {
  const handlePrevClick = () => goToSlide(currentIndex - 1);
  const handleNextClick = () => goToSlide(currentIndex + 1);

  return (
    <>
      <button
        type="button"
        className={cn(s.btnPrev)}
        style={currentIndex === 0 ? { display: 'none' } : null}
        onClick={handlePrevClick}
      >
        prev
      </button>
      <button
        type="button"
        className={cn(s.btnNext)}
        style={currentIndex === children.length - 1 ? { display: 'none' } : null}
        onClick={handleNextClick}
      >
        next
      </button>
    </>
  );
});
