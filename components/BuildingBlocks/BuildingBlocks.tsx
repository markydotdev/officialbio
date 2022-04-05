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

function BuildingBlocks() {
  return (
    <Position>
      <Scrolly>
        <Block>Text inside block</Block>
      </Scrolly>
    </Position>
  );
}

export default BuildingBlocks;
