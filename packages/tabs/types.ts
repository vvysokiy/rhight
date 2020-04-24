declare module '@rhight/tabs' {
  type ListItemType = {
    /** tab label */
    label: string
    /** tab value */
    value: number | string
    /** custom styles for tab */
    style?: React.CSSProperties
    /** custom class for tab */
    className?: string
    /** disable tab */
    isDisabled?: boolean
    /** other custom props for tab */
    [otherProp: string]: any
  }

  export interface ITabs {
    /** unique group name */
    name: string
    /** value of the selected tab */
    value: ListItemType['value']
    /** tabs list */
    list: ListItemType[]
    /** change handler */
    onChange: (listItem: ListItemType, event: React.ChangeEvent<HTMLInputElement>) => void
    /** tabs size */
    size?: 'big' | 'medium' | 'small'
    /** disable all tabs */
    isDisabled?: boolean
    /** custom styles for wrapper */
    style?: React.CSSProperties
    /** custom class for wrapper */
    className?: string
    /** other custom props */
    [otherProp: string]: any
  }

  /** Tabs - tabs list, based on input radio */
  const Tabs: React.FC<ITabs>;
  export default Tabs;
}
