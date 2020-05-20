import React from 'react';
import Swiper from '@rhight/swiper';

import { usePhotos } from './hooks';

export const AllEvents = () => {
  const slides = usePhotos();

  const [slideIndex, changeSlideIndex] = React.useState(1);

  return slides.length ? (
    <div style={{ margin: '10px', width: '300px' }}>
      <button
        type="button"
        onClick={() => changeSlideIndex(slideIndex + 2)}
      >
        change start index
      </button>
      <Swiper
        slideIndex={slideIndex}
        prevNext
        pagination
        transition="all 0.3s ease 0s"
        // eslint-disable-next-line no-console
        onMouseDown={(...props) => console.log('onMouseDown', props)}
        // eslint-disable-next-line no-console
        onMouseMove={(...props) => console.log('onMouseMove', props)}
        // eslint-disable-next-line no-console
        onMouseUp={(...props) => console.log('onMouseUp', props)}
        onSwiped={(event) => {
          // eslint-disable-next-line no-console
          console.log('onSwiped ->', event);
          changeSlideIndex(event.slideIndex);
        }}
      >
        {slides.map((item) => (
          <img
            key={item.id}
            draggable="false"
            style={{
              width: '200px',
              height: '150px',
            }}
            src={item.download_url}
            alt={item.author}
          />
        ))}
      </Swiper>
    </div>
  ) : null;
};
