import { forwardRef } from 'react';

import { styled } from '../../stitches.config';

const StyledCard = styled('li', {
  backgroundColor: '$gray1',
  padding: '1.5rem',
  listStyle: 'none',
  borderRadius: '$main',
  margin: '0.25rem',
  minWidth: '150px',
  variants: {
    disabled: {
      true: {
        filter: `opacity(0.4) !important`,
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
