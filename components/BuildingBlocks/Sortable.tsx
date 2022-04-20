import React from 'react';

import { useSortable } from '@dnd-kit/sortable';

import { styled } from '../../stitches.config';
import Card from './Card';

const SortableCard = styled(Card, {
  minWidth: 'unset',
});

function Sortable(props) {
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
    <SortableCard ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </SortableCard>
  );
}

export default Sortable;
