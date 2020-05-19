import { SlidesStateType, ISwiper } from '@rhight/swiper';

type WeightSlideType = {
  weight: number;
  index: number;
  node: HTMLDivElement;
  rect: DOMRect;
}

export const calcSlidesWidth = (slideNodeList: HTMLDivElement[], lastIndex: number) => {
  let index = 0;
  let width = 0;

  while (index <= lastIndex) {
    const slideNode = slideNodeList[index];
    width += slideNode.offsetWidth;
    index += 1;
  }

  return width;
};

export const getLeftCoordinate = (
  feedRef: React.MutableRefObject<HTMLDivElement>,
  rootRef: React.MutableRefObject<HTMLDivElement>,
) => {
  const leftFeed = feedRef.current.getBoundingClientRect().left;
  const leftRoot = rootRef.current.getBoundingClientRect().left;
  return leftFeed + window.pageXOffset - leftRoot;
};

const addLastAdvantage = (
  rootRef: React.MutableRefObject<any>,
  slidesState: SlidesStateType,
  weightSlides: WeightSlideType[],
  lastAdvantage: ISwiper['lastAdvantage'],
) => {
  const { clientWidth } = rootRef.current;

  weightSlides.forEach((slideObj, index, list) => {
    if (
      slideObj.index !== slidesState.slideIndex
      && (index === 0 || index === list.length - 1)
    ) {
      // eslint-disable-next-line no-param-reassign
      slideObj.weight += (clientWidth * lastAdvantage) / 100;
    }
  });
};


export const calcActiveSlide = (
  rootRef: React.MutableRefObject<any>,
  slideNodeList: HTMLDivElement[],
  slidesState: SlidesStateType,
  lastAdvantage: ISwiper['lastAdvantage'],
) => {
  let activeSlideIndex: number;

  const rectRoot = rootRef.current.getBoundingClientRect();
  const slideConfigList = slideNodeList.map((node, index) => ({
    index,
    node,
    rect: node.getBoundingClientRect(),
  }));

  // Определяем вхождение в область видимости
  const slidesInSwiperViewport = slideConfigList.filter((obj) => (
    (obj.rect.left + obj.rect.width) > rectRoot.left
    && obj.rect.left < rectRoot.left + rectRoot.width
  ));

  // Если в обаласти просмотра есть хоть один слайд
  if (slidesInSwiperViewport.length) {
    // Высчитываем вес - какой слайд наибольшую часть viewport свайпера занимает
    const weightSlides = slidesInSwiperViewport.map((slideConfig) => {
      const { rect: { left: slideLeft, right: slideRight } } = slideConfig;
      const { left: rootLeft, right: rootRight } = rectRoot;
      const start = slideLeft < rootLeft ? rootLeft : slideLeft;
      const end = slideRight < rootRight ? slideRight : rootRight;
      return { ...slideConfig, weight: end - start };
    });

    if (lastAdvantage) addLastAdvantage(rootRef, slidesState, weightSlides, lastAdvantage);

    let slideWithMaxWeight;
    weightSlides.forEach((obj) => {
      if (!slideWithMaxWeight || slideWithMaxWeight.weight < obj.weight) slideWithMaxWeight = obj;
    });

    activeSlideIndex = slideWithMaxWeight.index;
  } else if (slideConfigList[0].rect.left > rectRoot.right) {
    activeSlideIndex = 0;
  } else {
    activeSlideIndex = slideConfigList[slideConfigList.length - 1].index;
  }

  return activeSlideIndex;
};
