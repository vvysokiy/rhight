import React, { useState, useCallback } from 'react';
import DoubleSlider from '@rhight/double-slider';

export const Default = () => {
  const [values, setValues] = useState([20, 60]);

  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <DoubleSlider
        values={values}
        start={0}
        end={100}
        step={1}
        onChange={setValues}
      />
    </div>
  );
};
