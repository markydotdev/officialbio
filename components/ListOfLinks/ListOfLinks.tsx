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
import strings from '../../locales/en/strings';
import { supabase } from '../../utils/supabaseClient';
import Button from '../Button';
import { styled } from '../../stitches.config';

const ButtonSpacer = styled('div', {
  paddingTop: '1rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

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
  const user = supabase.auth.user();
  const [listOfLinks, setListOfLinks] = useState(links);
  const [disableButton, setDisableButton] = useState(false);
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

  async function handleSaveLinks() {
    setDisableButton(true);
    const { data, error } = await supabase
      .from('profiles')
      .update({ linkContent: listOfLinks }, { returning: 'minimal' })
      .eq('id', user.id);
    if (!data || !error) {
      setDisableButton(false);
    }
  }

  return (
    <>
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
      <ButtonSpacer>
        <Button
          onClick={() => handleSaveLinks()}
          type='button'
          disabled={disableButton}
          version={undefined}
          loading={undefined}
        >
          {strings.linkPage.save_order}
        </Button>
      </ButtonSpacer>
    </>
  );
};

export default ListOfLinks;
