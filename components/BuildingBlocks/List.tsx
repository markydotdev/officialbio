import { styled } from '../../stitches.config';

const StyledList = styled('div', {
  display: 'flex',
  overflowX: 'scroll',
  width: '100%',
  position: 'absolute',
  bottom: 0,
  backgroundColor: '$blue5',
  paddingTop: '1.5rem',
  paddingBottom: '1.5rem',
  paddingLeft: '0.5rem',
  paddingRight: '0.5rem',
  borderBottomLeftRadius: '$image',
  borderBottomRightRadius: '$image',
  '& > div': {
    margin: '0 0.5rem',
  },
});

const List = ({ children }) => {
  return <StyledList>{children}</StyledList>;
};

export default List;
