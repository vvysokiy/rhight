import React, { useState, useCallback } from 'react';
import Pagination from '@rhight/pagination';

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);
  // const onChange = useCallback((newValue: number) => {
  //   setValue(newValue);
  // }, []);
  return (
    <div style={{ margin: '10px', width: '400px' }}>
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        onChange={setCurrentPage}
        pageNeighbours={1}
      />
    </div>
  );
};
