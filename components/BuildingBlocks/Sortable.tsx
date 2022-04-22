import React from 'react';

import { useSortable } from '@dnd-kit/sortable';

import { styled } from '../../stitches.config';
import Card from './Card';

const SortableCard = styled(Card, {
  minWidth: 'unset',
});
const DragHandle = styled('button', {
  cursor: 'grab',
});

function InputField() {
  return <input type='text' required></input>;
}

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
    <SortableCard ref={setNodeRef} style={style}>
      <InputField />
      {props.children}
      <DragHandle {...listeners} {...attributes}>
        drag here
      </DragHandle>
    </SortableCard>
  );
}

export default Sortable;
