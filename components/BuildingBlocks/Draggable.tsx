import React from 'react';

import { useDraggable } from '@dnd-kit/core';

import Card from './Card';

export function Draggable(props) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: props.id,
    data: { name: props.name },
    disabled: props.disabled,
  });

  return (
    <Card
      ref={setNodeRef}
      dragging={isDragging}
      disabled={props.disabled}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </Card>
  );
}
