import React, { useState } from 'react';
import DoubleSlider from '@rhight/double-slider';

export const Default = () => {
  const [value, setValue] = useState<[number, number]>([20, 60]);

  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <DoubleSlider
        value={value}
        start={0}
        end={100}
        step={1}
        onChange={setValue}
      />
    </div>
  );
};
