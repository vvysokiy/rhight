declare module '@rhight/textarea' {
  export interface ITextarea {
    /** value of current input */
    value: string;
    /** input handler */
    onChange: (newValue: string) => void;
    /** type of counter */
    counterType?: 'none' | 'words' | 'symbols';
    /** input size */
    isMobile?: boolean;
    /** input label */
    header?: string;
    /** input  placeholder */
    placeholder?: string;
    /** disable input and label */
    isDisabled?: boolean;
  }

  const Input: React.FC<ITextarea>;
  export default Input;
}
