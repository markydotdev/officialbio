import React from 'react';

import { useDroppable } from '@dnd-kit/core';

import { styled } from '../../stitches.config';

const DropBox = styled('div', {
  backgroundColor: '$gray5',
  borderRadius: '$main',
  padding: '1rem',
  minHeight: '50vh',
});

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  });

  return <DropBox ref={setNodeRef}>{props.children}</DropBox>;
}

export default Droppable;
