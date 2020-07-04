import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
  useMemo,
} from 'react';
import cn from 'classnames';

import { IDoubleSlider } from '@rhight/double-slider';

import s from './styles.css';

const DoubleSlider: React.FC<IDoubleSlider> = ({
  value,
  onChange,
  start,
  end,
  step = 1,
  isDisabled = false,
}) => {
  const left = useMemo(() => (
    ((value[0] - start) / (end - start)) * 100
  ), [value, start, end]);

  const right = useMemo(() => (
    100 - ((value[1] - start) / (end - start)) * 100
  ), [value, start, end]);

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      const [firstValue, secondValue] = value;

      if (event.target.name === 'firstInput') {
        const minValue = Math.min(newValue, secondValue);
        onChange([minValue, secondValue], event);
      } else {
        const maxValue = Math.max(newValue, firstValue);
        onChange([firstValue, maxValue], event);
      }
    },
    [onChange, value],
  );

  return (
    <div className={s.root}>
      <div className={s.track} />
      <div
        className={cn(s.fill, { [s.disabled]: isDisabled })}
        style={{
          left: `${left}%`,
          right: `${right}%`,
        }}
      />
      <input
        type="range"
        className={s.slider}
        name="firstInput"
        min={start}
        max={end}
        step={step}
        onChange={onChangeLocal}
        value={value[0]}
        disabled={isDisabled}
      />
      <input
        type="range"
        className={s.slider}
        name="secondInput"
        min={start}
        max={end}
        step={step}
        onChange={onChangeLocal}
        value={value[1]}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DoubleSlider;
