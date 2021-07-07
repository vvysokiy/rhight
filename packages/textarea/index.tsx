import React, {
  useCallback, useRef, useState, useEffect,
} from 'react';
import cn from 'classnames';

import { ITextarea } from '@rhight/textarea';
import { Counter } from './counter';

import s from './styles.css';

const Textarea: React.FC<ITextarea> = ({
  value,
  onChange,
  counterType = 'none',
  header = '',
  placeholder = '',
  isMobile = false,
  isDisabled = false,
}) => {
  const wrapperRef = useRef(null);
  const borderRef = useRef(null);

  const [initialHeight, setHeight] = useState(0);

  useEffect(() => {
    const wrapperHeight = wrapperRef.current.offsetHeight;
    setHeight(wrapperHeight);
    wrapperRef.current.style.minHeight = `${initialHeight}px`;
  });

  const onChangeLocal = useCallback(
    (event) => {
      const newValue = (event.target as HTMLInputElement).value;
      onChange(newValue, event);
    },
    [onChange],
  );

  const onMouseDown = useCallback(
    (event) => {
      event.persist();

      document.body.style.cursor = 'ns-resize';

      const { top } = wrapperRef.current.getBoundingClientRect();
      const deltaHeight = (wrapperRef.current.offsetHeight + top) - event.clientY;

      const onMouseMove = (e) => {
        const newH = e.pageY - top + deltaHeight;
        wrapperRef.current.style.height = (newH > initialHeight ? `${newH}px` : `${initialHeight}px`);
      };

      document.addEventListener('mousemove', onMouseMove);

      document.onmouseup = () => {
        document.body.style.cursor = 'default';
        document.removeEventListener('mousemove', onMouseMove);
        document.onmouseup = null;
      };
    }, [initialHeight],
  );

  return (
    <div className={cn(
      s.root,
      { [s.rootMobile]: isMobile },
    )}
    >
      {header ? <div className={cn(s.header, { [s.headerMobile]: isMobile })}>{header}</div> : null}
      <div className={cn(s.wrapperTextarea, { [s.wrapperMobile]: isMobile })} ref={wrapperRef}>
        <textarea
          rows={2}
          value={value}
          className={cn(s.textarea, { [s.textareaMobile]: isMobile })}
          onChange={onChangeLocal}
          placeholder={placeholder}
          disabled={isDisabled}
        />
        <div className={s.wrapperBorder} ref={borderRef} />
        <div className={s.underline} />
        {counterType === 'none'
          ? null
          : <Counter value={value} counterType={counterType} isMobile={isMobile} />}
        <div role="button" aria-label="empty" className={s.just} onMouseDown={onMouseDown} tabIndex={0}>
          <div className={s.bigLine} />
          <div className={s.smallLine} />
        </div>
      </div>
    </div>
  );
};

export default Textarea;
