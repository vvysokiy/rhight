/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef } from 'react';
import cn from 'classnames';

import { ISwiper, SwiperStateType } from '@rhight/swiper';

import { Slides } from './Slides';
import { PrevNextBtn } from './PrevNextBtn';
import { Pagination } from './Pagination';

import { useSwiper } from './hooks';

import s from './styles.css';

const Swiper: React.FC<ISwiper> = React.memo(({
  children,
  startIndex = 0,
  onMouseDown: propOnMouseDown = null,
  onMouseMove: propOnMouseMove = null,
  onMouseUp: propOnMouseUp = null,
  onSwiped = null,
  style = null,
  className = '',
  pagination = false,
  slotPagination = null,
  prevNext = false,
  slotPrevNext = null,
  transition = 'all 0.5s ease 0s',
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
  });

  useEffect(() => {
    if (startIndex) goToSlide(startIndex, true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
      >
        <Slides
          slideNodeList={slideNodeList}
        >
          {children}
        </Slides>
      </div>

      {pagination && !slotPagination ? (
        <Pagination
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
