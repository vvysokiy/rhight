import React from 'react';
import Swiper from '@rhight/swiper';

import { usePhotos } from './hooks';

export const Default = () => {
  const slides = usePhotos();

  return (
    <div style={{ margin: '10px', width: '300px' }}>
      <Swiper
        prevNext
        pagination
      >
        {slides.map((item) => (
          <img
            key={item.id}
            draggable="false"
            style={{
              width: '300px',
              height: '200px',
            }}
            src={item.download_url}
            alt={item.author}
          />
        ))}
      </Swiper>
    </div>
  );
};
