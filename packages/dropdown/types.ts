declare module '@rhight/dropdown' {
  export type SelectItem = {
    id: number
    name: string
    /** other props */
    [x: string]: any
  }

  export interface ISelectList {
    /** Значени в выпадающем списке */
    value: SelectItem
    /** Список совпаней по названию */
    list: SelectItem[]
    /** Коллбэк, вызываемый при выборе из списка */
    onSelect: IDropdown['onChange']
    listRef: React.MutableRefObject<any>
  }

  export interface IDropdown {
    /** active item object */
    value: SelectItem
    /** check item handler */
    onChange: (listItem: SelectItem, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
    /** items in dropdown list */
    list?: SelectItem[]
    /** dropdown header */
    title?: string
    /** dropdown  placeholder */
    placeholder?: string
    /** custom className */
    className?: string
    /** marks component as required */
    require?: boolean
    /** btn for reset value */
    resetBtn?: boolean
    /** other props */
    [x: string]: any
  }

  const Dropdown: React.FC<IDropdown>;
  export default Dropdown;
}
