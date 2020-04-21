declare module '@rhight/use-scroll-resize' {
  /** Тип декорирования */
  export enum DECORATOR_TYPE {
    throttle,
    debounce,
  }

  type ConfigType = {
    /** тип декорирования (throttle/debounce) */
    decoratorType?: DECORATOR_TYPE
    /** время задержки колбэка (100мс) */
    ms?: number,
  }

  export type GetDecoratedFunction = (
    callback?: (event: Event) => void,
    config?: ConfigType,
  ) => (event: Event) => void

  /**
   * Хук обработки скролла/ресайза
   * @param callback - обработчик на событие скролла
   * @param config - конфигурация работы callback
   */
  export type UseScrollResizeType = (
    callback?: (event: Event) => void,
    config?: ConfigType,
  ) => void

  /** Хук обработки скролла с дебаунсингом/тротлингом */
  export const useScroll: UseScrollResizeType;

  /** Хук обработки ресайза с дебаунсингом/тротлингом */
  export const useResize: UseScrollResizeType;


  /** Хук обработки скролла и ресайза с дебаунсингом/тротлингом */
  export const useScrollResize: UseScrollResizeType;
}
