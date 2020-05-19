declare module '@rhight/swiper' {
  export type SwiperStateType = {
    /** new active slide index */
    index: number
    /** with or without animation */
    animation?: boolean
  }

  export type SlidesStateType = {
    /** new active slide index */
    slideIndex: number
    /** shift value */
    translateValue: number
  }

  export interface IPagination {
    children: React.ReactNode[]
    /** pagination animation */
    transition: string
    /** active slide index */
    currentIndex: number
  }
  export interface IPrevNextBtn {
    children: React.ReactNode[]
    /** active slide index */
    currentIndex: number
    /** swipe handler */
    goToSlide: (nextIndex: number, withoutAnimation?: boolean) => void
  }
  export interface ISlides {
    children: React.ReactNode[]
    /** links to slide nodes */
    slideNodeList: HTMLDivElement[]
  }
  export interface ISwiper {
    children: React.ReactNode[]
    /** first slide to display */
    startIndex?: number,
    /** start DND handler */
    onMouseDown?: (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>,
      state: SlidesStateType,
      DNDisActive: boolean,
    ) => void
    /** move DND handler */
    onMouseMove?: (
      event: MouseEvent,
      state: SlidesStateType,
      DNDisActive: boolean,
    ) => void
    /** end DND handler */
    onMouseUp?: (
      event: MouseEvent,
      state: SlidesStateType,
      DNDisActive: boolean,
    ) => void
    /** change slide handler */
    onSwiped?: (props: SlidesStateType) => void
    /** show/hidden pagination dots */
    pagination?: boolean
    /** slot for custom pagination */
    slotPagination?: (paginationProps: IPagination) => React.ReactNode
    /** visibled prev/next btn */
    prevNext?: boolean
    /** slot for custom prev/next btn */
    slotPrevNext?: (prevNextProps: IPrevNextBtn) => React.ReactNode
    /** slideshow animation */
    transition?: string
    /** custom styles for wrapper */
    style?: React.CSSProperties
    /** custom class for wrapper */
    className?: string
  }

  const Swiper: React.FC<ISwiper>;
  export default Swiper;
}
