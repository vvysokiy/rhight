import React, { useState, useCallback } from 'react';
import Pagination from '@rhight/pagination';

export const Default = () => {
  const [value, setValue] = useState(1);
  // const onChange = useCallback((newValue: number) => {
  //   setValue(newValue);
  // }, []);
  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <Pagination
        currentPage={value}
        totalPages={15}
        onChange={setValue}
        pageNeighbours={2}
      />
    </div>
  );
};
