import React, { useState, useCallback } from 'react';
import Textarea from '@rhight/textarea';

export const Default = () => {
  const f = true;
  const [value, setValue] = useState('');
  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  return (
    <div style={{ margin: '10px', width: '500px' }}>
      <Textarea
        value={value}
        onChange={onChange}
        header="Header"
        placeholder="Placeholder"
        counter="500"
        isMobile={f}
      />
    </div>
  );
};
