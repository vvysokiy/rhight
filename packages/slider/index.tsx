import React, {
  useCallback,
  useRef,
  useEffect,
} from 'react';
import cn from 'classnames';

import { ISlider } from '@rhight/slider';

import s from './styles.css';

const Slider: React.FC<ISlider> = ({
  value,
  onChange,
  start,
  end,
  step = 1,
  isDisabled = false,
}) => {
  const fillRef = useRef(null);

  const fillWidth = () => {
    const percent = (value / end) * 100;
    fillRef.current.style.width = `${percent}%`;
  };

  useEffect(() => fillWidth());

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      onChange(newValue, event);
    },
    [onChange],
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
        value={value}
        onMouseMove={fillWidth}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Slider;
