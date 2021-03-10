/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import cn from 'classnames';

import { ISwiper } from '@rhight/swiper';

import { Slides } from './Slides';
import { PrevNextBtn } from './PrevNextBtn';
import { Pagination } from './Pagination';

import { useSwiper, useSlideIndex } from './hooks';

import s from './styles.css';

const Swiper: React.FC<ISwiper> = React.memo(({
  children,
  slideIndex = 0,
  onMouseDown: propOnMouseDown = null,
  onMouseMove: propOnMouseMove = null,
  onMouseUp: propOnMouseUp = null,
  onSwiped = null,
  style = null,
  className = '',
  pagination = false,
  paginationStyle = null,
  paginationClassName = '',
  slotPagination = null,
  prevNext = false,
  prevBtnClassName = '',
  nextBtnClassName = '',
  slotPrevNext = null,
  transition = 'all 0.5s ease 0s',
  lastAdvantage = 0,
}) => {
  const {
    animation,
    rootRef,
    feedRef,
    slideNodeList,
    slidesState,
    goToSlide,
    onMouseDown,
  } = useSwiper({
    children,
    transition,
    propOnMouseDown,
    propOnMouseMove,
    propOnMouseUp,
    onSwiped,
    lastAdvantage,
  });

  useSlideIndex({ slideIndex, goToSlide });

  return (
    <div
      ref={rootRef}
      className={cn(s.root, className)}
      style={style}
    >
      <div
        ref={feedRef}
        className={s.slides}
        style={{
          transition: animation,
          transform: `translate3d(${slidesState.translateValue}px, 0, 0)`,
        }}
        onMouseDown={onMouseDown}
        // @ts-ignore
        onTouchStart={onMouseDown}
      >
        <Slides
          slideNodeList={slideNodeList}
        >
          {children}
        </Slides>
      </div>

      {pagination && !slotPagination ? (
        <Pagination
          style={paginationStyle}
          className={paginationClassName}
          transition={animation}
          currentIndex={slidesState.slideIndex}
        >
          {children}
        </Pagination>
      ) : null}
      {pagination && slotPagination ? (
        slotPagination({
          currentIndex: slidesState.slideIndex,
          transition,
          children,
        })
      ) : null}

      {prevNext && !slotPrevNext ? (
        <PrevNextBtn
          currentIndex={slidesState.slideIndex}
          goToSlide={goToSlide}
          prevBtnClassName={prevBtnClassName}
          nextBtnClassName={nextBtnClassName}
        >
          {children}
        </PrevNextBtn>
      ) : null}
      {prevNext && slotPrevNext ? (
        slotPrevNext({
          currentIndex: slidesState.slideIndex,
          goToSlide,
          children,
        })
      ) : null}
    </div>
  );
});

export default Swiper;
