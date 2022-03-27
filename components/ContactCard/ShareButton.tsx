import React from 'react';

import Button from '../Button';

function ShareButton({ children, onClick }) {
  return (
    <Button
      onClick={onClick}
      type={undefined}
      disabled={false}
      version={undefined}
      loading={false}
    >
      {children}
    </Button>
  );
}

export default ShareButton;
