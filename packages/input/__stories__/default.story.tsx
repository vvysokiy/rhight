import React, { useState, useCallback } from 'react';
import Input from '@rhight/input';

export const Default = () => {
  const [value, setValue] = useState('');
  const onChange = useCallback((newValue: string) => {
    setValue(newValue);
  }, []);
  return (
    <div style={{ margin: '10px', width: '350px' }}>
      <Input
        value={value}
        onChange={onChange}
        label="Header"
        placeholder="Placeholder"
      />
    </div>
  );
};
