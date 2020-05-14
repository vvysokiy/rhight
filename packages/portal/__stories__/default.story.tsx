import React from 'react';
import Portal from '@rhight/portal';

export const Default = () => {
  const [toggle, onChange] = React.useState(true);

  return (
    <div style={{ margin: '10px' }}>
      <button
        type="button"
        onClick={() => onChange(true)}
      >
        открыть портал
      </button>
      <button
        type="button"
        onClick={() => onChange(false)}
      >
        закрыть портал
      </button>
      <Portal
        closeOnEsc
        toggle={toggle}
        onClose={() => onChange(false)}
      >
        <div>
          тело портала. Нажмите ESC чтобы закрыть портал
        </div>
      </Portal>
    </div>
  );
};
