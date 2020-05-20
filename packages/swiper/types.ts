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
    transition: ISwiper['transition']
    /** active slide index */
    currentIndex: number
    /** custom styles for pagination dots */
    style?: React.CSSProperties
    /** custom class for pagination dots */
    className?: ISwiper['paginationClassName']
  }
  export interface IPrevNextBtn {
    children: React.ReactNode[]
    /** active slide index */
    currentIndex: number
    /** swipe handler */
    goToSlide: (nextIndex: number, withoutAnimation?: boolean) => void
    /** custom class for prev btn */
    prevBtnClassName?: string
    /** custom class for next btn */
    nextBtnClassName?: string
  }
  export interface ISlides {
    children: React.ReactNode[]
    /** links to slide nodes */
    slideNodeList: HTMLDivElement[]
  }
  export interface ISwiper {
    children: React.ReactNode[]
    /** first slide to display */
    slideIndex?: number,
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
    /** custom styles for pagination dots */
    paginationStyle?: React.CSSProperties
    /** custom class for pagination dots */
    paginationClassName?: string
    /** slot for custom pagination */
    slotPagination?: (paginationProps: IPagination) => React.ReactNode
    /** visibled prev/next btn */
    prevNext?: boolean
    /** custom class for prev btn */
    prevBtnClassName?: string
    /** custom class for next btn */
    nextBtnClassName?: string
    /** slot for custom prev/next btn */
    slotPrevNext?: (prevNextProps: IPrevNextBtn) => React.ReactNode
    /** slideshow animation */
    transition?: React.CSSProperties['transition']
    /** custom styles for wrapper */
    style?: React.CSSProperties
    /** custom class for wrapper */
    className?: string
    /** experimental property, adds weight to the last slide in the DND for smooth swipe */
    lastAdvantage?: number
  }

  const Swiper: React.FC<ISwiper>;
  export default Swiper;
}
