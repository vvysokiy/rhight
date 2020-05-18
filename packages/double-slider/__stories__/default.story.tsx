import React, { useState, useCallback } from 'react';
import DoubleSlider from '@rhight/double-slider';

export const Default = () => {
  const [values, setValues] = useState([20, 60]);
  const onChange = useCallback((newValue: number) => {
    const secondValue = values[1];
    setValues([newValue, secondValue]);
  }, [values]);
  const onChange2 = useCallback((newValue: number) => {
    const firstValue = values[0];
    setValues([firstValue, newValue]);
  }, [values]);
  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <DoubleSlider
        values={values}
        start={0}
        end={100}
        step={1}
        onChange={onChange}
        onChange2={onChange2}
      />
    </div>
  );
};
