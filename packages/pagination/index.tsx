import React, {
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import cn from 'classnames';

import { IPagination } from '@rhight/pagination';
import IconArrow from './svg/arrow.svg';

import s from './styles.css';

const Pagination: React.FC<IPagination> = ({
  onChange,
  value,
  start,
  end,
}) => {
  const array = useMemo(() => (
    new Array(end + 1 - start).fill(0).map((el, index) => start + index)
  ), [start, end]);

  const isInvalid = start >= end;

  useEffect(() => {
    if (isInvalid) throw new Error('start should be more than the end');
  }, [isInvalid]);

  const onClickNext = useCallback((event) => {
    if (value < end) {
      onChange(value + 1, event);
    }
  }, [value, end, onChange]);

  const onClickPrev = useCallback((event) => {
    if (value > 1) {
      onChange(value - 1, event);
    }
  }, [value, onChange]);

  if (isInvalid) return null;

  return (
    <div className={s.root}>
      <button
        type="button"
        aria-label="previous"
        className={s.prevArrow}
        disabled={value === start}
        onClick={onClickPrev}
      >
        <IconArrow className={s.icon} />
      </button>
      {array.map((pageNumber, index) => (
        <React.Fragment key={pageNumber}>
          {((value === array[array.length - 1]
            && index === array.length - 3)
            || (index + start === value - 1 && index > 3 && index < array.length - 2)) ? (
              <button
                type="button"
                className={s.dots}
              >
                ...
              </button>
            ) : null}

          <button
            type="button"
            onClick={(event) => onChange(pageNumber, event)}
            className={cn(s.item, {
              [s.visible]: (
                // первый
                index === 0
                // второй
                || (index === 1 && value < array[array.length - 5])
                // третий
                || (index === 2 && value < array[5])
                // последний
                || index === array.length - 1
                // предпоследний
                || (value > array[4] && index === array.length - 2)
                // третий с конца
                || ((value === array[array.length - 1] && index === array.length - 3)
                  || (value === array[array.length - 5] && index === array.length - 3))
                // активный
                || index + start === value
                // слева от активного
                || index + start === value - 1
                // справа от активного
                || index + start === value + 1
              ),
              [s.isActive]: index + start === value,
            })}
          >
            {pageNumber}
          </button>

          {((index + start === value + 1
            && value + 1 <= array[array.length - 5]
            && value > array[2])
            || (index === 3 && value < array[3])) ? (
              <button
                type="button"
                className={s.dots}
              >
                ...
              </button>
            ) : null}
        </React.Fragment>
      ))}
      <button
        type="button"
        aria-label="next"
        className={s.nextArrow}
        disabled={value === end}
        onClick={onClickNext}
      >
        <IconArrow className={s.icon} />
      </button>
    </div>
  );
};

export default Pagination;
