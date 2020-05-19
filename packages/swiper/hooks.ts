import {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';

import { SlidesStateType, ISwiper } from '@rhight/swiper';

import { calcActiveSlide, getLeftCoordinate, calcSlidesWidth } from './utils';

export const useSwiper = ({
  children,
  transition,
  propOnMouseDown,
  propOnMouseMove,
  propOnMouseUp,
  onSwiped,
}: {
  children: React.ReactNode[]
  transition: string
  propOnMouseDown: ISwiper['onMouseDown']
  propOnMouseMove: ISwiper['onMouseMove']
  propOnMouseUp: ISwiper['onMouseUp']
  onSwiped: ISwiper['onSwiped']
}) => {
  const [animation, changeAnimation] = useState(transition);

  const [slidesState, changeSlidesState] = useState<SlidesStateType>({
    slideIndex: 0,
    translateValue: 0,
  });

  const rootRef = useRef(null);
  const feedRef = useRef(null);
  const slideNodeList: HTMLDivElement[] = [];
  const shiftX = useRef(0);
  const [dndActive, changeDndActive] = useState(false);

  // Изменяем слайд при наличии индекса, на который меняем
  const goToSlide = useCallback((
    nextIndex: number,
    withoutAnimation: boolean = false,
    callback: any = null,
  ) => {
    if (children && nextIndex >= 0 && nextIndex < children.length) {
      if (withoutAnimation && animation) {
        changeAnimation('');
      } else if (!withoutAnimation && !animation) {
        changeAnimation(transition);
      }

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
    }
  }, [animation, slidesState, slideNodeList, children, transition, onSwiped]);

  const onMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const leftCoordinate = getLeftCoordinate(feedRef, rootRef);
    // @ts-ignore
    shiftX.current = (event.clientX || event.targetTouches[0].clientX) - leftCoordinate;

    const newState: SlidesStateType = { ...slidesState, translateValue: leftCoordinate };
    const DNDisActive = true;

    changeSlidesState(newState);
    changeDndActive(DNDisActive);
    if (propOnMouseDown) propOnMouseDown(event, newState, DNDisActive);
  }, [slidesState, propOnMouseDown]);

  const onMouseMove = useCallback((event: MouseEvent) => {
    const newState = {
      ...slidesState,
      // @ts-ignore
      translateValue: (event.pageX || event.targetTouches[0].clientX) - shiftX.current,
    };
    const DNDisActive = true;
    changeSlidesState(newState);
    if (propOnMouseMove) propOnMouseMove(event, newState, DNDisActive);
  }, [slidesState, propOnMouseMove]);

  const onMouseUp = useCallback((event: MouseEvent) => {
    if (dndActive) {
      const DNDisActive = false;
      changeDndActive(DNDisActive);
      goToSlide(
        calcActiveSlide(rootRef, slideNodeList),
        false,
        (newState: SlidesStateType) => {
          if (propOnMouseUp) propOnMouseUp(event, newState, DNDisActive);
        },
      );
    }
  }, [dndActive, slideNodeList, goToSlide, propOnMouseUp]);

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
    animation: dndActive ? '' : animation,
    rootRef,
    feedRef,
    slideNodeList,
    slidesState,
    goToSlide,
    onMouseDown,
  };
};
