import React, { useState, useCallback } from 'react';
import Textarea from '@rhight/textarea';

export const Mobile = () => {
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
        counterType="words"
        isMobile
      />
    </div>
  );
};
