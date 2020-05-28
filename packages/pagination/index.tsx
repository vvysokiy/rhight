import React, {
  useCallback,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import { IPagination } from '@rhight/pagination';
import IconArrow from './svg/arrow.svg';

import s from './styles.css';

const LEFT_PAGE = 'LEFT';
const RIGHT_PAGE = 'RIGHT';

const range = (from: number, to: number, step = 1) => {
  let i = from;
  const arr = [];

  while (i <= to) {
    arr.push(i);
    i += step;
  }

  return arr;
};

const Pagination: React.FC<IPagination> = ({
  onChange,
  currentPage,
  totalPages,
  pageNeighbours,

}) => {
  const [pagesArr, setPagesArr] = useState([]);
  const initialArr = Array(totalPages).fill(0).map((item, index) => index + 1);

  const onClickNext = useCallback((event) => {
    if (currentPage < totalPages) {
      onChange(currentPage + 1, event);
    }
  }, [currentPage, totalPages, onChange]);

  const onClickPrev = useCallback((event) => {
    if (currentPage > 1) {
      onChange(currentPage - 1, event);
    }
  }, [currentPage, onChange]);

  const handleMoveLeft = useCallback((event) => {
    onChange((currentPage - (pageNeighbours * 2) - 1), event);
  }, [currentPage, pageNeighbours, onChange]);

  const handleMoveRight = useCallback((event) => {
    onChange((currentPage + (pageNeighbours * 2) - 1), event);
  }, [currentPage, pageNeighbours, onChange]);


  const fetchPageNumbers = useCallback(() => {
    /**
     * totalNumbers: the total page numbers to show on the control
     * totalBlocks: totalNumbers + 2 to cover for the left(<) and right(>) controls
     */
    const totalNumbers = (pageNeighbours * 2) + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      /**
       * hasLeftSpill: has hidden pages to the left
       * hasRightSpill: has hidden pages to the right
       * spillOffset: number of hidden pages either to the left or to the right
       */

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = (totalPages - endPage) > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        // handle: (1) < {5 6} [7] {8 9} (10)
        case (hasLeftSpill && !hasRightSpill): {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [LEFT_PAGE, ...extraPages, ...pages];
          window.console.log(extraPages, 'fuck');
          break;
        }

        // handle: (1) {2 3} [4] {5 6} > (10)
        case (!hasLeftSpill && hasRightSpill): {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, RIGHT_PAGE];
          break;
        }

        // handle: (1) < {4 5} [6] {7 8} > (10)
        case (hasLeftSpill && hasRightSpill):
        default: {
          pages = [LEFT_PAGE, ...pages, RIGHT_PAGE];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }, [pageNeighbours, totalPages, currentPage]);

  useEffect(() => {
    const result = fetchPageNumbers();
    setPagesArr(result);
  }, [fetchPageNumbers]);

  return (
    <div className={s.root}>
      <button type="button" aria-label="previous" className={s.prevArrow} disabled={currentPage === 1} onClick={onClickPrev}><IconArrow className={s.icon} /></button>
      {pagesArr.map((page, index) => {
        if (page === LEFT_PAGE) {
          return (
            <button
              key={page}
              type="button"
              className={s.item}
              onClick={handleMoveLeft}
            >
              ...
            </button>
          );
        }

        if (page === RIGHT_PAGE) {
          return (
            <button
              key={page}
              type="button"
              className={s.item}
              onClick={handleMoveRight}
            >
              ...
            </button>
          );
        }

        return (
          <button
            key={page}
            type="button"
            className={cn(s.item, { [s.isActive]: currentPage === page })}
            onClick={(event) => onChange(page, event)}
          >
            {page}
          </button>
        );
      })}
      <button type="button" aria-label="next" className={s.nextArrow} disabled={currentPage === totalPages} onClick={onClickNext}><IconArrow className={s.icon} /></button>
    </div>
  );
};

export default Pagination;
