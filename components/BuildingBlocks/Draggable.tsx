import React from 'react';

import { useDraggable } from '@dnd-kit/core';

import { styled } from '../../stitches.config';

const StyledCard = styled('div', {
  backgroundColor: '$gray1',
  padding: '2rem',
});

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <StyledCard ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </StyledCard>
  );
}
