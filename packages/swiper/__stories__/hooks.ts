import { useState, useEffect } from 'react';

const random = (min: number, max: number) => Math.floor(min + Math.random() * (max + 1 - min));

export const usePhotos = () => {
  const [slides, changeSlides] = useState([]);

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fetch(`https://picsum.photos/v2/list?page=${random(1, 99)}&limit=10`)
      .then((e) => e.json())
      .then(changeSlides)
      .catch();
  }, []);

  return slides;
};
