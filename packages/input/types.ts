declare module "@rhight/input" {
  export interface IInput {
    value: string;
    height: "small" | "default";
    onChange: (newValue: string) => void;
    labelId?: string;
    label?: string;
    placeholder?: string;
    isDisabled?: boolean;
  }

  const Input: React.FC<IInput>;
  export default Input;
}
