declare module '@rhight/pagination' {
  export interface IPagination {
    /** value of current page */
    currentPage: number;
    /** count of pages */
    totalPages: number;
    /** input handler */
    onChange: (newValue: number, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    /** additional page numbers to show on each side of the current page*/
    pageNeighbours: number;
  }

  const Pagination: React.FC<IPagination>;
  export default Pagination;
}
