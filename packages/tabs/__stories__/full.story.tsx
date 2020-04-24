import React from 'react';
import Tabs from '@rhight/tabs';

const list = [
  {
    label: 'Moscow',
    value: 1,
    className: 'test-class-1',
    'data-test': 'data-item-test-1',
  },
  {
    label: 'London',
    value: 2,
    className: 'test-class-2',
    'data-test': 'data-item-test-2',
  },
  {
    label: 'New York',
    value: 3,
    className: 'test-class-3',
    'data-test': 'data-item-test-3',
  },
];

export const Full = () => {
  const [value, changeValue] = React.useState(1);
  const onChange = (item) => changeValue(item.value);

  return (
    <div style={{ margin: '10px' }}>
      <Tabs
        name="test"
        list={list}
        value={value}
        onChange={onChange}
        size="big"
        style={{ margin: '30px' }}
        data-test="data-test"
      />
    </div>
  );
};
