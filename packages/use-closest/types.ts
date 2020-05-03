import { MutableRefObject } from 'react';

declare module '@rhight/use-closest' {
  export type UseClosestType = (
    /** обработчик */
    callback: (isClosest: boolean, event: Event) => void,
    /** флаг активности слушателя document.body */
    active?: boolean,
  ) => MutableRefObject<any>;
}
