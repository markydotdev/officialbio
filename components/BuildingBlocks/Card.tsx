import { ComponentPropsWithoutRef, forwardRef } from 'react';

import { styled } from '../../stitches.config';

const StyledCard = styled('li', {
  backgroundColor: '$gray1',
  padding: '2rem',
  listStyle: 'none',
});

type LiProps = ComponentPropsWithoutRef<'li'>;

const Item = forwardRef<HTMLLIElement, LiProps>(
  ({ children, style, ...props }, ref) => {
    return (
      <StyledCard {...props} style={style} ref={ref}>
        {children}
      </StyledCard>
    );
  }
);

export default Item;
