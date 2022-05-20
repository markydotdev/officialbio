import { useEffect, useState } from 'react';
import ProfileLink from './ProfileLink';

import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

const Sortables = ({ modifiers, sensors, items, children, handleDragEnd }) => {
  return (
    <DndContext
      modifiers={modifiers}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
};

const ListOfLinks = ({ links, removeLink }) => {
  const [listOfLinks, setListOfLinks] = useState(links);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setListOfLinks(links);
  }, [links]);

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setListOfLinks((items) => {
        const oldIndex = items
          .map((item) => String(item.id))
          .indexOf(active.id);
        const newIndex = items.map((item) => String(item.id)).indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Sortables
      items={listOfLinks.map((item) => String(item.id))}
      sensors={sensors}
      handleDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      {listOfLinks.map((link) => (
        <ProfileLink
          id={String(link.id)}
          key={link.id}
          linkId={link.id}
          display={link.display}
          link={link.text}
          removeLink={removeLink}
        />
      ))}
    </Sortables>
  );
};

export default ListOfLinks;
