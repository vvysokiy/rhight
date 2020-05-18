declare module '@rhight/double-slider' {
  export interface IDoubleSlider {
    /** array of values */
    values: number[];
    /** value of min input */
    start: number;
    /** value of max input */
    end: number;
    /** input handler */
    onChange: (newValue: number, index: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** input handler */
    // onChange2: (newValue: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** value of step moving */
    step?: number;
    /** disable input */
    isDisabled?: boolean;
  }

  const DoubleSlider: React.FC<IDoubleSlider>;
  export default DoubleSlider;
}
