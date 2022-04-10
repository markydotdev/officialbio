import React, { useState } from 'react';
import { createPortal } from 'react-dom';

import {
    DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import Card from './Card';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
import List from './List';
import { Sortable } from './Sortable';

const ListOfDraggables = [
  { id: '1', type: 'wide', name: 'Test string 1' },
  { id: '2', type: 'square', name: 'Test string 2' },
  { id: '3', type: 'square', name: 'Test string 3' },
  { id: '4', type: 'wide', name: 'Test string 4' },
  { id: '5', type: 'square', name: 'test string 5' },
  { id: '6', type: 'square', name: 'test string 6' },
  { id: '7', type: 'square', name: 'test string 7' },
  { id: '8', type: 'square', name: 'test string 8' },
  { id: '9', type: 'square', name: 'test string 9' },
  { id: '10', type: 'square', name: 'test string 10' },
  { id: '11', type: 'square', name: 'test string 11' },
];
const SortItem = ({ id, name }) => {
  return <Sortable id={id}>{name}</Sortable>;
};
const DragItem = ({ id, name }) => {
  return <Draggable id={id}>{name}</Draggable>;
};

function BuildingBlocks() {
  const [activeId, setActiveId] = useState(null);
  const [dropped, setDropped] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <List>
        {ListOfDraggables.map((item) => (
          <DragItem key={item.id} id={item.id} name={item.name} />
        ))}
      </List>

      <Droppable id={'B'}>
        <SortableContext
          items={dropped.length < 1 ? dropped : dropped.map((item) => item.id)}
        >
          {dropped.length >= 1 &&
            dropped.map((item) => (
              <SortItem key={item.id} id={item.id} name={item.name} />
            ))}
        </SortableContext>
      </Droppable>

      <DragOverlay>{activeId && <Card id={activeId} />}</DragOverlay>
    </DndContext>
  );

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }
  function handleDragEnd(event) {
    const { active, over } = event;
    if (active.id !== over.id) {
      if (dropped.length < 1) {
        setDropped(ListOfDraggables.filter((item) => item.id === active.id));
      } else if (!dropped.find((el) => el.id === active.id)) {
        // Checking if it already exists and if it doesn't then add the item
        const newItem = ListOfDraggables.filter(
          (item) => item.id === active.id
        );
        setDropped([...dropped, newItem[0]]);
      }
      console.log('being sorted');
      setDropped((items) => {
        const activeIndex = items.findIndex(({ id }) => id === active.id);
        const overIndex = items.findIndex(({ id }) => id === over.id);

        return arrayMove(items, activeIndex, overIndex);
      });
    }
    setActiveId(null);
  }
}

export default BuildingBlocks;
