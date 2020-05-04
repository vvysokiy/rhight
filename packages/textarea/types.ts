declare module '@rhight/textarea' {
  export interface ITextarea {
    /** value of current input */
    value: string;
    /** input handler */
    onChange: (newValue: string) => void;
    /** input size */
    isMobile?: boolean;
    /** input label */
    header?: string;
    /** input  placeholder */
    placeholder?: string;
    /** disable input and label */
    isDisabled?: boolean;
    /** letter or words counter */
    counter?: string;
  }

  const Input: React.FC<ITextarea>;
  export default Input;
}
