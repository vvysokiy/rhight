import React, {
  useCallback,
  useRef,
  useEffect,
  useState,
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

  const [leftSpace, setLeftSpace] = useState(false);
  const [rightSpace, setRightSpace] = useState(false);

  const fillWidth = useCallback(() => {
    if (fillRef && fillRef.current) {
      const percent = ((value - start) / (end - start)) * 100;

      if (percent === 0) {
        setLeftSpace(true);
      } else {
        setLeftSpace(false);
      }

      if (percent === 100) {
        setRightSpace(true);
        fillRef.current.style.width = `${percent - 1}%`;
      } else {
        setRightSpace(false);
        fillRef.current.style.width = `${percent}%`;
      }
    }
  }, [value, start, end]);

  useEffect(fillWidth);

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = Number((event.target as HTMLInputElement).value);
      onChange(newValue, event);
    },
    [onChange],
  );

  return (
    <div className={s.root}>
      <div className={cn(s.track,
        { [s.leftSpace]: leftSpace },
        { [s.rightSpace]: rightSpace })}
      />
      <div
        ref={fillRef}
        className={cn(s.fill, { [s.disabled]: isDisabled })}
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
