import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
} from 'react';
import { useClosest } from '@rhight/use-closest';

export const usePosition = () => {
  const drapdownRef = useRef(null);
  const [position, changePosition] = useState({ top: 0, width: 0, left: 0 });

  useEffect(() => {
    if (drapdownRef) {
      const { current } = drapdownRef;
      const coordinate = current.getBoundingClientRect();

      const top = coordinate.bottom + window.pageYOffset;
      const left = coordinate.left + window.pageXOffset;

      changePosition({ top, left, width: current.clientWidth });
    }
  }, []);

  const { top, left, width } = position;

  return {
    drapdownRef,
    PositionWrapper: ({ children }) => (
      <div
        style={{
          position: 'absolute',
          top,
          left,
          width,
        }}
      >
        {children}
      </div>
    ),
  };
};


export const useDropdownClosest = (
  listOpen: boolean,
  changeOpen: (toggleOpen: boolean) => void,
) => {
  const buttonRef = useRef(null);

  const onClose = useCallback((closest: boolean, event: Event) => {
    const clickOnButton = (
      buttonRef
      && buttonRef.current
      && event.target === buttonRef.current
    );
    if (!closest && !clickOnButton) changeOpen(false);
  }, [changeOpen]);

  const listRef = useClosest(listOpen ? onClose : null);

  return {
    listRef,
    buttonRef,
  };
};
