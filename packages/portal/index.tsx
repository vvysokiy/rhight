import React, { useState, useCallback, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { IPortal } from '@rhight/portal';

const Portal: React.FC<IPortal> = ({
  toggle,
  onClose,
  closeOnEsc = true,
  children,
}) => {
  const [portalNode, addPortalNode] = useState<HTMLDivElement>(null);

  useEffect(() => {
    addPortalNode(document.createElement('div'));
  }, []);

  useEffect(() => {
    if (!portalNode || !toggle) return undefined;

    window.document.body.appendChild(portalNode);

    if (closeOnEsc) window.addEventListener('keydown', onClose, true);

    return () => {
      window.document.body.removeChild(portalNode);
      if (closeOnEsc) window.removeEventListener('keydown', onClose, true);
    };
  }, [portalNode, toggle, closeOnEsc, onClose]);

  if (!portalNode || !toggle) return null;

  return ReactDOM.createPortal(
    children,
    portalNode,
  );
};

export default Portal;
