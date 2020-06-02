import React, { useState } from 'react';
import Pagination from '@rhight/pagination';

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={{ margin: '10px', width: '600px' }}>
      <Pagination
        currentPage={currentPage}
        start={1}
        end={9999}
        onChange={setCurrentPage}
      />
    </div>
  );
};
