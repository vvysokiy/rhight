import {
  MutableRefObject,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import { UseClosestType } from '@rhight/use-closest';

/**
 * Реализация Element.closest(), но поиск по ref
 * @param element - ссылка на элемент, от которого начинается поиск
 * @param ref - react-реф
 */
export const closest = (element: any, ref: any): any => {
  if (!ref || !ref.current) return null;

  const { current } = ref;

  if (element === current) return current;

  const { parentElement } = element;

  if (!parentElement) return null;

  return closest(parentElement, ref);
};

export const useClosest: UseClosestType = (callback, active = true) => {
  const ref = useRef(null);

  const onClickBody = useCallback((event: Event) => {
    const isClosest = Boolean(closest(event.target, ref));
    callback(isClosest);
  }, [callback]);

  useEffect(() => {
    if (callback) {
      if (active) document.body.addEventListener('click', onClickBody);
      return () => {
        if (active) document.body.removeEventListener('click', onClickBody);
      };
    }
    return undefined;
  }, [active, callback, onClickBody]);

  return ref;
};
