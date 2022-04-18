import { forwardRef } from 'react';

import { styled } from '../../stitches.config';

const StyledCard = styled('li', {
  backgroundColor: '$gray1',
  padding: '2rem',
  listStyle: 'none',
  cursor: 'grab',
  borderRadius: '$main',
  margin: '0.25rem',
  variants: {
    type: {
      social: {
        minWidth: '10rem',
        minHeight: '10rem',
      },
      description: {
        minWidth: '20rem',
        minHeight: '10rem',
      },
      avatar: {
        minHeight: '10rem',
        minWidth: '5rem',
      },
    },
    disabled: {
      true: {
        filter: `opacity(0.2) !important`,
        cursor: 'not-allowed',
        userSelect: 'none',
      },
    },
    dragging: {
      true: {
        cursor: 'grabbing !important',
      },
      false: {
        filter: 'opacity(1)',
      },
    },
  },
});

interface LiProps extends React.ComponentPropsWithoutRef<'li'> {
  disabled?: boolean;
  dragging?: boolean;
  type?: 'social' | 'description' | 'avatar';
}

const Item = forwardRef<HTMLLIElement, LiProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <StyledCard style={style} ref={ref} {...props}>
        {children}
      </StyledCard>
    );
  }
);

export default Item;
