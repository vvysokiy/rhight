import React, { useState, useCallback } from 'react';
import Toggle from '@rhight/toggle';

export const Mobile = () => {
  const [checked, setChecked] = useState(false);
  const onChange = useCallback((newValue: boolean) => {
    setChecked(!newValue);
  }, []);

  return (
    <div style={{ margin: '10px' }}>
      <Toggle
        checked={checked}
        onChange={onChange}
        isMobile
      />
    </div>
  );
};
