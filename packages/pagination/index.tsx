import React, {
  useCallback,
  useEffect,
  useState,
  useMemo,
} from 'react';
import cn from 'classnames';

import { IPagination } from '@rhight/pagination';
import IconArrow from './svg/arrow.svg';

import s from './styles.css';

const Pagination: React.FC<IPagination> = ({
  onChange,
  currentPage,
  start,
  end,
  pageNeighbours,

}) => {
  const [pagesArr, setPagesArr] = useState([]);
  // const initialArr = Array(totalPages).fill(0).map((item, index) => index + 1);

  const array = useMemo(() => (new Array(end)).fill(0).map((el, index) => start + index),
    [start, end]);

  window.console.log(array.length);

  const onClickNext = useCallback((event) => {
    if (currentPage < end) {
      onChange(currentPage + 1, event);
    }
  }, [currentPage, end, onChange]);

  const onClickPrev = useCallback((event) => {
    if (currentPage > 1) {
      onChange(currentPage - 1, event);
    }
  }, [currentPage, onChange]);

  return (
    <div className={s.root}>
      <button
        type="button"
        aria-label="previous"
        className={s.prevArrow}
        disabled={currentPage === 1}
        onClick={onClickPrev}
      >
        <IconArrow className={s.icon} />
      </button>
      {array.map((page, index) => (
        <>
          {(currentPage === array.length && index === array.length - 3) ? (
            <button
              type="button"
              className={cn(s.dots, s.singleDots)}
            >
              ...
            </button>
          ) : null}

          {(index + 1 === currentPage - 1 && index > 3 && index < array.length - 2) ? (
            <button
              type="button"
              className={cn(s.dots, s.leftDots)}
            >
              ...
            </button>
          ) : null}

          <button
            type="button"
            onClick={(event) => onChange(page, event)}
            className={cn(s.item, {
              [s.visible]: (
                // первый
                index === 0
                // второй
                || (index === 1 && currentPage < array.length - 3)
                // третий
                || (index === 2 && currentPage < 6)
                // последний
                || index === array.length - 1
                // предпоследний
                || (currentPage > 5 && index === array.length - 2)
                // третий с конца
                || (currentPage === array.length && index === array.length - 3)
                // активный
                || index + 1 === currentPage
                // слева от активного
                || index + 1 === currentPage - 1
                // справа от активного
                || index + 1 === currentPage + 1
              ),
              [s.isActive]: index + 1 === currentPage,
            })}
          >
            {page}
          </button>

          {(index + 1 === currentPage + 1 && currentPage + 1 <= array.length - 3 && currentPage > 3) ? (
            <button
              type="button"
              className={cn(s.dots, s.rightDots)}
            >
              ...
            </button>
          ) : null}

          {(index === 3 && currentPage < 4) ? (
            <button
              type="button"
              className={cn(s.dots, s.singleDots)}
            >
              ...
            </button>
          ) : null}
        </>
      ))}
      <button type="button" aria-label="next" className={s.nextArrow} disabled={currentPage === end} onClick={onClickNext}><IconArrow className={s.icon} /></button>
    </div>
  );
};

export default Pagination;
