import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { ISelectList } from '@rhight/dropdown';
import s from './styles.css';

export const ListSelect: React.FC<ISelectList> = ({
  list,
  onSelect,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
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
            className={cn(s.item)}
            type="button"
            onClick={(event) => onSelect(event, item)}
            {...props}
          >
            {name}
          </button>
        );
      })}
    </div>
  );
};
