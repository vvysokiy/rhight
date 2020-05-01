import React, { useState, useCallback } from 'react';
import cn from 'classnames';
// import { useClosest } from '@rhight/use-closest';

import { IDropdown } from '@rhight/dropdown';
import IconArrow from './svg/arrow.svg';
import { Title } from './Title';
import { ListSelect } from './ListSelect';
import s from './styles.css';

const Dropdown: React.FC<IDropdown> = ({
  value,
  onChange,
  list = [],
  title = '',
  placeholder = '',
}) => {
  const [isOpen, changeOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    changeOpen(!isOpen);
  }, [isOpen]);

  const changeCurrentView = useCallback((event, item) => {
    // console.log('changeCurrentView -> event, item', event, item);
    // onSelect(event, item);
    // changeOpen(false);
  }, []);

  return (
    <div className={s.root}>
      {title && (
        <Title>{title}</Title>
      )}

      <div className={s.dropdown}>
        <button
          type="button"
          onClick={toggleOpen}
          className={s.dropdownTitle}
        >
          {value && value.name ? (
            <div className={s.text}>
              {value.name}
            </div>
          ) : (
            <div className={s.placeholder}>
              {placeholder}
            </div>
          )}
          {list.length ? (
            <IconArrow className={cn(s.icon, isOpen && s.iconOpen)} />
          ) : null}
        </button>

        {/* <div className={s.dropdownBorder} /> */}

        {isOpen && list.length > 0 && (
          <ListSelect
            list={list}
            onSelect={changeCurrentView}
          />
        )}
      </div>
    </div>
  );
};

export default Dropdown;
