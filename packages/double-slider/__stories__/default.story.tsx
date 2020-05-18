import React, { useState, useCallback } from 'react';
import DoubleSlider from '@rhight/double-slider';

export const Default = () => {
  const [values, setValues] = useState([20, 60]);

  const onChange = useCallback((newValue: number, index: number) => {
    const firstValue = values[0];
    const secondValue = values[1];

    if (index === 0) {
      setValues([newValue, secondValue]);
    } else {
      setValues([firstValue, newValue]);
    }
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
      />
    </div>
  );
};
