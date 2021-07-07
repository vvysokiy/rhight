import React, { useState } from 'react';
import Pagination from '@rhight/pagination';

export const Default = () => {
  const [currentPage, setCurrentPage] = useState(13);

  return (
    <div style={{ margin: '10px', width: '600px' }}>
      <Pagination
        value={currentPage}
        start={13}
        end={46}
        onChange={setCurrentPage}
      />
    </div>
  );
};
