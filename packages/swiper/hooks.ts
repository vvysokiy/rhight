import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { SlidesStateType, ISwiper } from '@rhight/swiper';

import { calcActiveSlide, getLeftCoordinate, calcSlidesWidth } from './utils';

type GoToSlideType = (nextIndex: number, withoutAnimation?: boolean, callback?: any) => void

type UseGoToSlideType = (props: {
  children: React.ReactNode[]
  feedRef: React.MutableRefObject<any>
  slideNodeList: HTMLDivElement[]
  slidesState: SlidesStateType
  changeSlidesState: React.Dispatch<React.SetStateAction<SlidesStateType>>
  onSwiped: ISwiper['onSwiped']
}) => { goToSlide: GoToSlideType, animationDisabled: boolean }

type UseDNDType = (props: {
  rootRef: React.MutableRefObject<any>
  feedRef: React.MutableRefObject<any>
  slideNodeList: HTMLDivElement[]
  goToSlide: GoToSlideType
  slidesState: SlidesStateType
  changeSlidesState: React.Dispatch<React.SetStateAction<SlidesStateType>>
  propOnMouseDown: ISwiper['onMouseDown']
  propOnMouseMove: ISwiper['onMouseMove']
  propOnMouseUp: ISwiper['onMouseUp']
  lastAdvantage: ISwiper['lastAdvantage']
}) => {
  onMouseDown: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  dndActive: boolean
}

const useGoToSlide: UseGoToSlideType = ({
  children,
  feedRef,
  slideNodeList,
  slidesState,
  changeSlidesState,
  onSwiped,
}) => {
  const [animationDisabled, toggleAnimation] = useState(false);

  // Изменяем слайд при наличии индекса, на который меняем
  const goToSlide: GoToSlideType = useCallback((
    nextIndex: number,
    withoutAnimation: boolean = false,
    callback: any = null,
  ) => {
    if (children && nextIndex >= 0 && nextIndex < children.length) {
      if (withoutAnimation) toggleAnimation(true);

      const wrapperWidth = feedRef.current.offsetWidth;

      let fullSlidersWidth: number;
      if (nextIndex === 0) {
        fullSlidersWidth = 0;
      } else if (nextIndex === children.length - 1) {
        const leftTapeWidth = calcSlidesWidth(slideNodeList, nextIndex);
        fullSlidersWidth = leftTapeWidth - wrapperWidth;
      } else {
        const leftTapeWidth = calcSlidesWidth(slideNodeList, nextIndex);
        const currentSlideNode = slideNodeList[nextIndex];
        const currentSlideWidth = currentSlideNode.offsetWidth;
        const shiftValue = (wrapperWidth + currentSlideWidth) / 2;

        fullSlidersWidth = leftTapeWidth - shiftValue;
      }

      const oldIndex = slidesState.slideIndex;
      const newState = { slideIndex: nextIndex, translateValue: (-1) * fullSlidersWidth };
      changeSlidesState(newState);

      if (callback) callback(newState);
      if (onSwiped && oldIndex !== newState.slideIndex) onSwiped(newState);

      if (withoutAnimation) toggleAnimation(false);
    }
  }, [changeSlidesState, children, feedRef, onSwiped, slideNodeList, slidesState.slideIndex]);

  return {
    goToSlide,
    animationDisabled,
  };
};

const useDND: UseDNDType = ({
  rootRef,
  feedRef,
  slideNodeList,
  goToSlide,
  slidesState,
  changeSlidesState,
  propOnMouseDown,
  propOnMouseMove,
  propOnMouseUp,
  lastAdvantage,
}) => {
  const shiftX = useRef(0);
  const [dndActive, changeDndActive] = useState(false);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const leftCoordinate = getLeftCoordinate(feedRef, rootRef);
    // @ts-ignore
    shiftX.current = (event.clientX || event.targetTouches[0].clientX) - leftCoordinate;

    const newState: SlidesStateType = { ...slidesState, translateValue: leftCoordinate };
    const DNDisActive = true;

    changeSlidesState(newState);
    changeDndActive(DNDisActive);
    if (propOnMouseDown) propOnMouseDown(event, newState, DNDisActive);
  }, [rootRef, feedRef, changeSlidesState, slidesState, propOnMouseDown]);

  const onMouseMove = useCallback((event: MouseEvent) => {
    const newState = {
      ...slidesState,
      // @ts-ignore
      translateValue: (event.clientX || event.targetTouches[0].clientX) - shiftX.current,
    };
    const DNDisActive = true;
    changeSlidesState(newState);
    if (propOnMouseMove) propOnMouseMove(event, newState, DNDisActive);
  }, [slidesState, changeSlidesState, propOnMouseMove]);

  const onMouseUp = useCallback((event: MouseEvent) => {
    if (dndActive) {
      const DNDisActive = false;
      changeDndActive(DNDisActive);
      goToSlide(
        calcActiveSlide(rootRef, slideNodeList, slidesState, lastAdvantage),
        false,
        (newState: SlidesStateType) => {
          if (propOnMouseUp) propOnMouseUp(event, newState, DNDisActive);
        },
      );
    }
  }, [slidesState, lastAdvantage, rootRef, dndActive, slideNodeList, goToSlide, propOnMouseUp]);

  useEffect(() => {
    if (!dndActive) return undefined;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    document.addEventListener('touchmove', onMouseMove);
    document.addEventListener('touchend', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      document.removeEventListener('touchmove', onMouseMove);
      document.removeEventListener('touchend', onMouseUp);
    };
  }, [dndActive, onMouseUp, onMouseMove]);

  return {
    onMouseDown,
    dndActive,
  };
};

export const useSwiper = ({
  children,
  transition,
  propOnMouseDown,
  propOnMouseMove,
  propOnMouseUp,
  onSwiped,
  lastAdvantage,
}: {
  children: React.ReactNode[]
  transition: string
  propOnMouseDown: ISwiper['onMouseDown']
  propOnMouseMove: ISwiper['onMouseMove']
  propOnMouseUp: ISwiper['onMouseUp']
  onSwiped: ISwiper['onSwiped']
  lastAdvantage: ISwiper['lastAdvantage']
}) => {
  const [slidesState, changeSlidesState] = useState<SlidesStateType>({
    slideIndex: 0,
    translateValue: 0,
  });

  const rootRef = useRef(null);
  const feedRef = useRef(null);
  const slideNodeList: HTMLDivElement[] = [];

  const { animationDisabled, goToSlide } = useGoToSlide({
    children,
    feedRef,
    slideNodeList,
    slidesState,
    changeSlidesState,
    onSwiped,
  });

  const { dndActive, onMouseDown } = useDND({
    rootRef,
    feedRef,
    slideNodeList,
    goToSlide,
    slidesState,
    changeSlidesState,
    propOnMouseDown,
    propOnMouseMove,
    propOnMouseUp,
    lastAdvantage,
  });

  return {
    animation: dndActive || animationDisabled ? '' : transition,
    rootRef,
    feedRef,
    slideNodeList,
    slidesState,
    goToSlide,
    onMouseDown,
  };
};

export const useStartIndex = ({
  startIndex,
  goToSlide,
}: {
  startIndex: ISwiper['startIndex']
  goToSlide: GoToSlideType,
}) => {
  useEffect(() => {
    if (startIndex) goToSlide(startIndex, true);
  }, [startIndex]); // eslint-disable-line react-hooks/exhaustive-deps
};
