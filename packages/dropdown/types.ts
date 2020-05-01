declare module '@rhight/dropdown' {
  export type SelectItem = {
    id: number
    name: string
    /**
     * Другие пропсы
     */
    [x: string]: any
  }

  export interface ISelectList {
    /** Список совпаней по названию */
    list: SelectItem[]
    /** Коллбэк, вызываемый при выборе из списка */
    onSelect: (event: React.SyntheticEvent, obj: SelectItem) => void
  }

  export interface IDropdown {
    /** Значени в выпадающем списке */
    value: SelectItem
    /** Обработчик изменения значения */
    onChange: (listItem: SelectItem, event: React.ChangeEvent<HTMLInputElement>) => void
    /** Список значений в выпадающем меню */
    list?: SelectItem[]
    /** Заголовок над дропдауном */
    title?: string
    placeholder?: string
    /** CSS-класс основного контейнера */
    className?: string
  }

  const Dropdown: React.FC<IDropdown>;
  export default Dropdown;
}
