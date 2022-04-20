import { styled } from '../../stitches.config';

const ListContainer = styled('div', {
  margin: '0 auto',
  overflowX: 'scroll',
  overflowY: 'hidden',
  paddingTop: '0',
  paddingBottom: '1.5rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  borderRadius: '$main',
});
const StyledList = styled('ul', {
  display: 'flex',
  padding: 0,
  margin: 0,
  paddingLeft: '1rem',
});

const List = ({ children }) => {
  return (
    <ListContainer>
      <StyledList>{children}</StyledList>
    </ListContainer>
  );
};

export default List;
