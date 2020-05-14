declare module '@rhight/portal' {
  export interface IPortal {
    /** portal status flag */
    toggle: boolean
    /** portal close handler */
    onClose: () => void
    /** closing the portal by button ESC */
    closeOnEsc?: boolean
  }

  const Portal: React.FC<IPortal>;
  export default Portal;
}
