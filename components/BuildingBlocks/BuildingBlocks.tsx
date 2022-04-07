import { useState } from 'react';

import { styled } from '../../stitches.config';
import Card from './Card';
import DragBox from './DragBox';
import DropGrid from './DropGrid';
import List from './List';

const Container = styled('div', {
  display: 'flex',
  flex: 1,
  position: 'relative',
  height: '100%',
});
const items = [
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
  'Item 5',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
  'Item 6',
  'Item 7',
  'Item 8',
  'Item 9',
  'Item 10',
];

function BuildingBlocks() {
  return (
    <Container>
      <DropGrid />

      <List>
        {items.map((item) => (
          <DragBox key={item} dataItem={item}>
            <Card type='square'>{item}</Card>
          </DragBox>
        ))}
      </List>
    </Container>
  );
}

export default BuildingBlocks;
