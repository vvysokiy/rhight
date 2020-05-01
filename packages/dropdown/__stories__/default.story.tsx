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
  // const [value, changeValue] = React.useState(list[0]);
  const [value, changeValue] = React.useState(null);
  const onChange = (item) => {
    // changeValue(item.value)
  };

  return (
    <div style={{ margin: '10px' }}>
      <Dropdown
        value={value}
        onChange={onChange}
        list={list}
        title="test-title"
        placeholder="test-placeholder"
      />
    </div>
  );
};
