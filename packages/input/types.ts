declare module '@rhight/input' {
  export interface IInput {
    /** value of current input */
    value: string;
    /** input handler */
    onChange: (newValue: string) => void;
    /** input size */
    size?: 'small' | 'default';
    /** input label */
    label?: string;
    /** input  placeholder */
    placeholder?: string;
    /** input type */
    type?: 'text';
    /** disable input and label */
    isDisabled?: boolean;
  }

  const Input: React.FC<IInput>;
  export default Input;
}
