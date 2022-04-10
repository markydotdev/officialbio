import React from 'react';

import { useDraggable } from '@dnd-kit/core';

import Card from './Card';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    data: { name: props.name },
  });

  const style = isDragging
    ? { filter: `opacity(0.5)` }
    : { filter: `opacity(1)` };

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Card>
  );
}
