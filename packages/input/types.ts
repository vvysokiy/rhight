declare module '@rhight/input' {
  export interface IInput {
    value: string;
    onChange: (newValue: string) => void;
    size?: 'small' | 'default';
    label?: string;
    placeholder?: string;
    type?: 'text';
    isDisabled?: boolean;
  }

  const Input: React.FC<IInput>;
  export default Input;
}
