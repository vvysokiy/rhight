import React, { useState, useEffect, useCallback } from 'react';
import cn from 'classnames';

import { ISelectList } from '@rhight/dropdown';
import s from './styles.css';

export const ListSelect: React.FC<ISelectList> = ({
  value,
  list,
  onSelect,
  listRef,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setMounted(true), 10);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      ref={listRef}
      className={cn(
        s.root,
        mounted && s.mounted,
      )}
    >
      {list.map((item, i) => {
        const { id, name, ...props } = item;
        return (
          <button
            key={id}
            className={cn(s.item, {
              [s.selected]: value && value.id === id,
            })}
            type="button"
            onClick={(event) => onSelect(item, event)}
            {...props}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
