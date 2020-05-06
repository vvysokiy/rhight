declare module '@rhight/counter' {
  export interface ICounter {
    /** value for calculation */
    value?: string;
    /** type of counter */
    counterType?: 'none' | 'words' | 'symbols';
    /** counter size */
    isMobile?: boolean;
  }

  const Counter: React.FC<ICounter>;
  export default Counter;
}
