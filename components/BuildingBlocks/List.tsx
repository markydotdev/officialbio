import { styled } from '../../stitches.config';

const StyledList = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
  width: '100%',
  position: 'absolute',
  bottom: 0,
});

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default List;
