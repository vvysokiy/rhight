import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
} from 'react';
import cn from 'classnames';

import { IDoubleSlider } from '@rhight/double-slider';

import s from './styles.css';

const DoubleSlider: React.FC<IDoubleSlider> = ({
  values,
  onChange,
  start,
  end,
  step = 1,
  isDisabled = false,
}) => {
  const fillRef = useRef(null);
  const [left, changeLeft] = useState(0);
  const [right, changeRight] = useState(0);

  const setLeft = () => {
    const percent = ((values[0] - start) / (end - start)) * 100;
    changeLeft(percent);
  };

  const setRight = () => {
    const percent = 100 - ((values[1] - start) / (end - start)) * 100;
    changeRight(percent);
  };

  useEffect(() => {
    setLeft();
    setRight();
  });

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      const firstValue = values[0];
      const secondValue = values[1];

      if (event.target.name === 'firstInput') {
        const minValue = Math.min(newValue, values[1]);
        onChange([minValue, secondValue], event);
      } else {
        const maxValue = Math.max(newValue, values[0]);
        onChange([firstValue, maxValue], event);
      }
    },
    [onChange, values],
  );

  return (
    <div className={s.root}>
      <div className={s.track} />
      <div
        ref={fillRef}
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
        value={values[0]}
        onMouseMove={setLeft}
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
        value={values[1]}
        onMouseMove={setRight}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DoubleSlider;
