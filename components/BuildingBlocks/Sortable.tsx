import React from 'react';

import { useSortable } from '@dnd-kit/sortable';

import Card from './Card';

export function Sortable(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      data: { name: props.name },
    });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition,
      }
    : undefined;

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </Card>
  );
}
