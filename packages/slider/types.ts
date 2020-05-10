declare module '@rhight/slider' {
  export interface ISlider {
    /** value of current input */
    value: number;
    /** value of min input */
    start: number;
    /** value of max input */
    end: number;
    /** input handler */
    onChange: (newValue: number, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** value of step moving */
    step?: number;
    /** disable input */
    isDisabled?: boolean;
  }

  const Slider: React.FC<ISlider>;
  export default Slider;
}
