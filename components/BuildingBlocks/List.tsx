import { styled } from '../../stitches.config';

const ListContainer = styled('div', {
  width: '50vw',
  margin: '0 auto',
  overflowX: 'scroll',
  overflowY: 'hidden',
  backgroundColor: '$blue5',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  borderBottomLeftRadius: '$image',
  borderBottomRightRadius: '$image',
});
const StyledList = styled('ul', {
  display: 'flex',
});

const List = ({ children }) => {
  return (
    <ListContainer>
      <StyledList>{children}</StyledList>
    </ListContainer>
  );
};

export default List;
