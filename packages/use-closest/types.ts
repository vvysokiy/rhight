declare module '@rhight/use-closest' {
  import { MutableRefObject } from 'react';

  export type UseClosestType = (
    /** closest handler */
    callback: (isClosest: boolean, event: Event) => void,
    /** ocument.body listener activity flag */
    active?: boolean,
  ) => MutableRefObject<any>;

  export const useClosest: UseClosestType;
}
