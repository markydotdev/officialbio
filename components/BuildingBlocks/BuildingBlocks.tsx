import React, { useState } from 'react';

import { DndContext } from '@dnd-kit/core';

import { Draggable } from './Draggable';
import { Droppable } from './Droppable';

const ListOfDraggables = [
  { id: 1, type: 'wide', name: 'Twitter' },
  { id: 2, type: 'square', name: 'Tumblr' },
  { id: 3, type: 'square', name: 'Youtube' },
  { id: 4, type: 'wide', name: 'Spotify' },
];
const DragItem = ({ id, name }) => {
  return <Draggable id={id}>{name}</Draggable>;
};

function BuildingBlocks() {
  const containers = ['A', 'B'];
  const [parent, setParent] = useState(null);

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {ListOfDraggables.map((item) => (
        <DragItem key={item.id} {...item} />
      ))}

      {parent === null ? <DragItem id={undefined} name={undefined} /> : null}

      {containers.map((id) => (
        // We updated the Droppable component so it would accept an `id`
        // prop and pass it to `useDroppable`
        <Droppable key={id} id={id}>
          {parent === id ? <DragItem id={1} name='whatever' /> : 'Drop here'}
        </Droppable>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}

export default BuildingBlocks;
