declare module '@rhight/checkbox' {
  export interface ICheckbox {
    /** variable value of checkbox */
    checked: boolean;
    /** handler of checkbox */
    onChange: (newValue: boolean) => void;
    /** disable checkbox */
    isDisabled?: boolean;
    /** unusable prop for label correct working */
    label?: string;
  }

  const Checkbox: React.FC<ICheckbox>;
  export default Checkbox;
}
