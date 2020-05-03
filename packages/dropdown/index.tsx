import React, { useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import Portal from '@rhight/portal';

import { IDropdown } from '@rhight/dropdown';
import IconArrow from './svg/arrow.svg';
import IconCross from './svg/cross.svg';
import { Title } from './Title';
import { ListSelect } from './ListSelect';
import { usePosition, useDropdownClosest } from './use';
import s from './styles.css';

const Dropdown: React.FC<IDropdown> = ({
  value,
  onChange,
  list = [],
  title = '',
  placeholder = '',
  className = '',
  style = null,
  require = false,
  resetBtn = false,
  ...props
}) => {
  const [isOpen, changeOpen] = useState(false);
  const toggleOpen = useCallback(() => changeOpen(!isOpen), [isOpen]);

  const onChangeLocal = useCallback((item, event) => {
    changeOpen(false);
    onChange(item, event);
  }, [onChange]);

  const { drapdownRef, PositionWrapper } = usePosition();

  const selectListOpen = isOpen && list.length > 0;
  const { listRef, buttonRef } = useDropdownClosest(selectListOpen, changeOpen);

  return (
    <div className={cn(s.root, className)} style={style} {...props}>
      {title && (
        <Title require={require}>{title}</Title>
      )}

      <div
        ref={drapdownRef}
        className={s.dropdown}
      >
        <button
          ref={buttonRef}
          type="button"
          onClick={toggleOpen}
          className={s.dropdownBtn}
        >
          toggle dropdown
        </button>
        <div className={s.dropdownTitle}>
          {value && value.name ? (
            <div className={s.dropdownText}>
              <div className={s.text}>
                {value.name}
              </div>
              <button
                type="button"
                onClick={(event) => onChange(null, event)}
                className={s.resetBtn}
              >
                <IconCross />
              </button>
            </div>
          ) : (
            <div className={s.placeholder}>
              {placeholder}
            </div>
          )}
          {list.length ? (
            <IconArrow className={cn(s.icon, isOpen && s.iconOpen)} />
          ) : null}
        </div>

        <Portal
          toggle={selectListOpen}
          onClose={() => changeOpen(false)}
        >
          <PositionWrapper>
            <ListSelect
              value={value}
              list={list}
              onSelect={onChangeLocal}
              listRef={listRef}
            />
          </PositionWrapper>
        </Portal>
      </div>
    </div>
  );
};

export default Dropdown;
