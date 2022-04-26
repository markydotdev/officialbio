import React, { useContext, useEffect, useState } from 'react';

import {
    DndContext, DragOverlay, KeyboardSensor, PointerSensor, useSensor, useSensors
} from '@dnd-kit/core';
import {
    arrayMove, rectSortingStrategy, SortableContext, sortableKeyboardCoordinates
} from '@dnd-kit/sortable';

import strings from '../../locales/en/strings';
import { UserContext } from '../../pages/_app';
import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';
import Button from '../Button';
import Card from './Card';
import Draggable from './Draggable';
import Droppable from './Droppable';
import List from './List';
import Blocks from './ListOfBlocks';
import Sortable from './Sortable';

const StyledButton = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  paddingTop: '1rem',
});

const SortItem = ({ id, name, type }) => {
  return (
    <Sortable id={id} name={name} type={type}>
      {name}
    </Sortable>
  );
};
const DragItem = ({ id, name, disabled, type }) => {
  return (
    <Draggable id={id} name={name} disabled={disabled} type={type}>
      {name}
    </Draggable>
  );
};

function BuildingBlocks({ preset }) {
  const userId = useContext(UserContext);
  const [activeId, setActiveId] = useState(null);
  const [activeName, setActiveName] = useState('');
  const [dropped, setDropped] = useState(preset || [{ id: '1' }]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    if (preset !== null) {
      setDropped(preset);
    }
  }, [preset]);

  const handleSubmit = async () => {
    // take input from local storage
    // using dropped to select the ids
    const savedData = dropped.map((item) => ({
      id: item.id,
      text: JSON.parse(localStorage.getItem(item.id)),
      name: item.name,
      type: item.type,
    }));
    // send it to supabase
    const { data, error } = await supabase
      .from('profiles')
      .update({ linkContent: savedData }, { returning: 'minimal' })
      .match({ id: userId });
  };
  const handleDragStart = (event) => {
    setActiveName(event.active.data.current.name);
    setActiveId(event.active.id);
  };
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      if (dropped.length < 1) {
        setDropped(Blocks.filter((item) => item.id === active.id));
      } else if (!dropped.find((el) => el.id === active.id)) {
        // Checking if it already exists and if it doesn't then add the item
        const newItem = Blocks.filter((item) => item.id === active.id);
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
  };

  return (
    <>
      <h2>{strings.create.title}</h2>
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <List>
          {Blocks.map((item) => (
            <DragItem
              key={item.id}
              id={item.id}
              name={item.name}
              disabled={dropped && dropped.some((el) => el.id === item.id)}
              type={item.type}
            />
          ))}
        </List>

        <Droppable id={'B'}>
          <SortableContext
            strategy={rectSortingStrategy}
            items={
              dropped.length <= 1 ? dropped : dropped.map((item) => item.id)
            }
          >
            {dropped.length >= 1 &&
              dropped.map((item) => (
                <SortItem
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  type={item.type + '-sort'}
                />
              ))}
          </SortableContext>
        </Droppable>

        <DragOverlay>
          {activeId && (
            <Card id={activeId} dragging={true}>
              {activeName}
            </Card>
          )}
        </DragOverlay>
      </DndContext>

      <StyledButton>
        <Button
          onClick={() => handleSubmit()}
          type='submit'
          disabled={false}
          version={undefined}
          loading={undefined}
        >
          Finalize
        </Button>
      </StyledButton>
    </>
  );
}

export default BuildingBlocks;
