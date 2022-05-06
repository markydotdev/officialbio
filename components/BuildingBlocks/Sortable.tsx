import React, { useEffect, useState } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CaretSortIcon, TrashIcon } from '@radix-ui/react-icons';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import Card from './Card';

const SortCard = styled('div', {
  display: 'flex',
});
const SortableCard = styled(Card, {
  flex: 1,
  minWidth: 'unset',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 !important',
});
const DragHandle = styled('button', {
  cursor: 'grab',
  padding: '1rem',
  outline: 'none',
  border: 'none',
  backgroundColor: 'transparent',
  width: '4rem',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
});
const InputSection = styled('div', {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
});
const Input = styled('input', {
  backgroundColor: '$gray5',
  border: 'none',
  borderRadius: '$image',
  padding: '0.75rem 1rem',
  margin: '0.5rem 0 1rem 1rem',
  flex: 1,
});
const Label = styled('label', {
  paddingLeft: '1rem',
  paddingTop: '0.5rem',
  color: '$gray10',
  fontSize: '16px',
});
const DeleteButton = styled('button', {
  backgroundColor: 'transparent',
  border: 'none',
  transition: '$main',
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '& svg': {
    width: '1.3rem',
    height: '1.3rem',
    color: 'red',
    marginTop: '0.20rem',
  },
});

function InputField({ id, text }) {
  const [textInput, setTextInput] = useState(
    text || JSON.parse(localStorage.getItem(`${id}-text`)) || ''
  );

  useEffect(() => {
    if (textInput.length >= 1) {
      const delay = setTimeout(() => {
        localStorage.setItem(`${id}-text`, JSON.stringify(textInput));
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [textInput]);

  return (
    <Input
      id={id}
      type='url'
      value={textInput}
      onChange={(e) => setTextInput(e.target.value)}
      required
    ></Input>
  );
}
function AlternateField({ id, display }) {
  const [displayInput, setDisplayInput] = useState(
    display || JSON.parse(localStorage.getItem(`${id}-display`)) || ''
  );

  useEffect(() => {
    if (displayInput.length >= 1) {
      const delay = setTimeout(() => {
        localStorage.setItem(`${id}-display`, JSON.stringify(displayInput));
      }, 500);

      return () => clearTimeout(delay);
    }
  }, [displayInput]);

  return (
    <Input
      id={id}
      type='text'
      value={displayInput}
      onChange={(e) => setDisplayInput(e.target.value)}
      required
    ></Input>
  );
}
function InputLabel({ children }) {
  return <Label htmlFor={children}>{children}</Label>;
}
function RemoveButton({ handleDelete }) {
  return (
    <DeleteButton onClick={handleDelete} type='button'>
      <TrashIcon />
    </DeleteButton>
  );
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
    <SortCard>
      <SortableCard ref={setNodeRef} style={style}>
        <InputSection>
          <InputLabel>{strings.create.displayLabelForLink}</InputLabel>
          <InputField id={props.id} text={props.text} />
        </InputSection>
        <InputSection>
          <InputLabel>{strings.create.displayTextForLink}</InputLabel>
          <AlternateField id={props.id} display={props.display} />
        </InputSection>
        <DragHandle {...listeners} {...attributes}>
          <CaretSortIcon />
        </DragHandle>
      </SortableCard>
      <RemoveButton handleDelete={props.handleDelete} />
    </SortCard>
  );
}

export default Sortable;
