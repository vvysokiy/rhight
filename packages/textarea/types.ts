declare module '@rhight/textarea' {

  export interface ICounter {
    /** value for calculation */
    value?: string;
    /* type of counter */
    counterType?: 'none' | 'words' | 'symbols';
    /* counter size */
    isMobile?: boolean;
  }

  export interface ITextarea {
    /** value of current input */
    value: string;
    /** input handler */
    onChange: (newValue: string, event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

  const Textarea: React.FC<ITextarea>;
  export default Textarea;
}
