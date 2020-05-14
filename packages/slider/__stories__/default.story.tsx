import React, { useState, useCallback } from 'react';
import Slider from '@rhight/slider';

export const Default = () => {
  const [value, setValue] = useState(250);
  const onChange = useCallback((newValue: number) => {
    setValue(newValue);
  }, []);
  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <Slider
        value={value}
        start={0}
        end={500}
        step={10}
        onChange={onChange}
      />
    </div>
  );
};
