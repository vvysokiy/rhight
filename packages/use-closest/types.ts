import { MutableRefObject } from 'react';

declare module '@rhight/use-closest' {
  export type UseClosestType = (
    /** closest handler */
    callback: (isClosest: boolean, event: Event) => void,
    /** ocument.body listener activity flag */
    active?: boolean,
  ) => MutableRefObject<any>;
}
