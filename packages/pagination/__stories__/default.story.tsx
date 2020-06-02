import React, { useState, useCallback } from 'react';
import Pagination from '@rhight/pagination';

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const onChange = useCallback((newValue: number) => {
  //   setValue(newValue);
  // }, []);
  return (
    <div style={{ margin: '10px', width: '600px' }}>
      <Pagination
        currentPage={currentPage}
        start={1}
        end={9999}
        onChange={setCurrentPage}
        pageNeighbours={1}
      />
    </div>
  );
};
