import React, { useEffect, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CaretSortIcon } from '@radix-ui/react-icons';

import { styled } from '../../stitches.config';
import Card from './Card';

const SortableCard = styled(Card, {
  minWidth: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
});
const DragHandle = styled('button', {
  cursor: 'grab',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
});
const Input = styled('input', {
  backgroundColor: '$gray5',
  border: 'none',
  borderRadius: '$image',
  padding: '0.5rem 0.75rem',
  flex: 1,
});
const Label = styled('label', {});

function InputField({ id, text }) {
  const [textInput, setTextInput] = useState(
    text || JSON.parse(localStorage.getItem(id)) || ''
  );

  useEffect(() => {
    if (textInput.length >= 1) {
      const delay = setTimeout(() => {
        localStorage.setItem(id, JSON.stringify(textInput));
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [textInput]);

  return (
    <Input
      id={id}
      type='text'
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      required
    ></Input>
  );
}
function InputLabel({ children }) {
  return <Label htmlFor={children}>{children}</Label>;
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
      <InputLabel>{props.children}</InputLabel>
      <InputField id={props.id} text={props.text} />
      <DragHandle {...listeners} {...attributes}>
        <CaretSortIcon />
      </DragHandle>
    </SortableCard>
  );
}

export default Sortable;
