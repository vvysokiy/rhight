import React, { useState, useCallback } from 'react';
import Checkbox from '@rhight/checkbox';

export const Disabled = () => {
  const isDisabled = true;
  const [checked, setChecked] = useState(false);
  const onChange = useCallback((newValue: boolean) => {
    setChecked(!newValue);
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <Checkbox
        checked={checked}
        onChange={onChange}
        isDisabled={isDisabled}
      />
    </div>
  );
};
