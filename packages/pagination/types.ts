declare module '@rhight/pagination' {
  export interface IPagination {
    /** value of current page */
    value: number;
    /** start page */
    start: number;
    /** count of pages */
    end: number;
    /** pagination handler */
    onChange: (newValue: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

  const Pagination: React.FC<IPagination>;
  export default Pagination;
}
