import { useState } from 'react';
import Draggable, { DraggableCore } from 'react-draggable';

import { styled } from '../../stitches.config';

const Position = styled('div', {
  height: 'calc(100vh - 1rem)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
});
const Scrolly = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
});
const Block = styled('div', {
  backgroundColor: 'white',
  padding: '1rem',
  margin: '1rem',
  minWidth: '10rem',
  cursor: 'grab',
});
// Duplicate the dragged item into placement where it gets duplicated into the realized component? Probably happens on create page...
const Placement = styled('div', {});

function BuildingBlocks() {
  return (
    <Position className='boundary'>
      <Scrolly>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
        <Draggable bounds='.boundary'>
          <Block>Hate It</Block>
        </Draggable>
      </Scrolly>
    </Position>
  );
}

export default BuildingBlocks;
