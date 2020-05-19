import React from 'react';
import Swiper from '@rhight/swiper';

const items = [
  {
    id: 1,
    name: 'title1',
  },
  {
    id: 2,
    name: 'title2',
  },
  {
    id: 3,
    name: 'title3',
  },
  {
    id: 4,
    name: 'title4',
  },
  {
    id: 5,
    name: 'title5',
  },
  {
    id: 6,
    name: 'title6',
  },
  {
    id: 7,
    name: 'title7',
  },
  {
    id: 8,
    name: 'title8',
  },
];

export const Default = () => (
  <div style={{ margin: '10px', width: '300px' }}>
    <Swiper
      startIndex={1}
      prevNext
      pagination
      transition="all 0.3s ease 0s"
      // eslint-disable-next-line no-console
      onMouseDown={(...props) => console.log('onMouseDown', props)}
      // eslint-disable-next-line no-console
      onMouseMove={(...props) => console.log('onMouseMove', props)}
      // eslint-disable-next-line no-console
      onMouseUp={(...props) => console.log('onMouseUp', props)}
      // eslint-disable-next-line no-console
      onSwiped={(event) => console.log('onSwiped ->', event)}
    >
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            width: '200px',
            height: '150px',
            background: 'red',
            border: '5px solid black',
          }}
        >
          {item.name}
        </div>
      ))}
    </Swiper>
  </div>
);
