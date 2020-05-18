import React, {
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';

import { IDoubleSlider } from '@rhight/double-slider';

import s from './styles.css';

const DoubleSlider: React.FC<IDoubleSlider> = ({
  values,
  onChange,
  onChange2,
  start,
  end,
  step = 1,
  isDisabled = false,
}) => {
  const fillRef = useRef(null);

  const setLeft = () => {
    const percent = ((values[0] - start) / (end - start)) * 100;
    fillRef.current.style.left = `${percent}%`;
  };

  const setRight = () => {
    const percent = 100 - ((values[1] - start) / (end - start)) * 100;
    fillRef.current.style.right = `${percent}%`;
  };

  useEffect(() => {
    setLeft();
    setRight();
  });

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      const minValue = Math.min(newValue, values[1]);
      onChange(minValue, event);
    },
    [onChange, values],
  );

  const onChangeLocal2 = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      const maxValue = Math.max(newValue, values[0]);
      onChange2(maxValue, event);
    },
    [onChange2, values],
  );

  return (
    <div className={s.root}>
      <div className={s.track} />
      <div
        ref={fillRef}
        className={
          cn(s.fill,
            { [s.disabled]: isDisabled })
        }
      />
      <input
        type="range"
        className={s.slider}
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
        min={start}
        max={end}
        step={step}
        onChange={onChangeLocal2}
        value={values[1]}
        onMouseMove={setRight}
        disabled={isDisabled}
      />
    </div>
  );
};

export default DoubleSlider;
