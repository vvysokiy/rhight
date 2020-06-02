declare module '@rhight/pagination' {
  export interface IPagination {
    /** value of current page */
    currentPage: number;
    /** start page */
    start: number;
    /** count of pages */
    end: number;
    /** input handler */
    onChange: (newValue: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  }

  const Pagination: React.FC<IPagination>;
  export default Pagination;
}
