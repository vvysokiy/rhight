import React, { useState, useCallback } from 'react';
import cn from 'classnames';

import { ITabs } from '@rhight/tabs';

import s from './styles.css';

const Tabs: React.FC<ITabs> = ({
  name,
  list,
  value,
  onChange,
  size = 'medium',
  style = null,
  isDisabled = false,
  ...props
}) => (
  <div className={s.root} style={style} {...props}>
    {list.map((item) => {
      const {
        value: tabValue,
        label,
        className: tabClassName = '',
        style: tabStyle = null,
        isDisabled: tabIsDisabled,
        ...itemProps
      } = item;
      const disabled = tabIsDisabled || isDisabled;

      return (
        <label
          className={cn(s.label, tabClassName, {
            [s.disabled]: disabled,
          })}
          style={tabStyle}
          {...itemProps}
        >
          <input
            type="radio"
            value={tabValue}
            name={name}
            onChange={(event) => onChange(item, event)}
          />
          <div
            className={cn(s.tab, s[size], {
              [s.tabActive]: tabValue === value,
              [s.disabled]: disabled,
            })}
          >
            {label}
          </div>
        </label>
      );
    })}
  </div>
);

export default Tabs;
