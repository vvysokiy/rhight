import { useEffect } from 'react';
import _throttle from 'lodash.throttle';
import _debounce from 'lodash.debounce';

import { UseScrollResizeType, GetDecoratedFunction } from '@rhight/use-scroll-resize';

export enum DECORATOR_TYPE {
  throttle,
  debounce,
}

const RESIZE_EVENT = 'resize';
const SCROLL_EVENT = 'scroll';
const MS_DEFAULT = 100;

/**
 * Метод декорирования функции
 * @param callback - обработчик на событие скролла
 * @param config.decoratorType - тип декорирования
 * @param config.ms - время задержки колбэка
 */
const getDecoratedFunction: GetDecoratedFunction = (callback, config = {}) => {
  const { ms = MS_DEFAULT, decoratorType = DECORATOR_TYPE.throttle } = config;
  const decoratorFunc = decoratorType === DECORATOR_TYPE.throttle ? _throttle : _debounce;
  return decoratorFunc(callback, ms);
};

/**
 * Хук обработки события в useEffect
 * @param eventName - имя события для наблюдения
 * @param callback - обработчик на событие ресайза
 */
const useEventEffect = (
  eventName: typeof RESIZE_EVENT | typeof SCROLL_EVENT,
  callback: (event: Event) => void,
) => {
  useEffect(() => {
    if (callback) window.addEventListener(eventName, callback);
    return () => {
      if (callback) window.removeEventListener(eventName, callback);
    };
  }, [callback, eventName]);
};

export const useScroll: UseScrollResizeType = (callback, config) => {
  const localCallback = callback ? getDecoratedFunction(callback, config) : null;
  useEventEffect(SCROLL_EVENT, localCallback);
};

export const useResize: UseScrollResizeType = (callback, config) => {
  const localCallback = callback ? getDecoratedFunction(callback, config) : null;
  useEventEffect(RESIZE_EVENT, localCallback);
};

export const useScrollResize: UseScrollResizeType = (callback, config) => {
  const localCallback = callback ? getDecoratedFunction(callback, config) : null;
  useEventEffect(SCROLL_EVENT, localCallback);
  useEventEffect(RESIZE_EVENT, localCallback);
};
