import React from 'react';
import Dropdown from '@rhight/dropdown';

const list = [
  {
    name: 'Moscow',
    id: 1,
  },
  {
    name: 'London',
    id: 2,
  },
  {
    name: 'New York',
    id: 3,
  },
];

export const Default = () => {
  const [value, changeValue] = React.useState(null);

  return (
    <div style={{ margin: '10px', minHeight: '1000px' }}>
      <Dropdown
        require
        resetBtn
        value={value}
        onChange={changeValue}
        list={list}
        title="test-title"
        placeholder="test-placeholder"
      />
    </div>
  );
};
