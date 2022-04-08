import React from 'react';

import { styled } from '../../stitches.config';

const StyledPreview = styled('div', {
  minWidth: '6rem',
  minHeight: '6rem',
  backgroundColor: '$gray1',
  padding: '1rem',
  boxShadow: '$low',
  borderRadius: '$image',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 0.5rem',
  variants: {
    type: {
      wide: {
        width: '100%',
      },
      square: {
        width: '50%',
        height: '6rem',
      },
    },
  },
});

const PreviewCard = ({ type, children }) => {
  return <StyledPreview type={type}>{children}</StyledPreview>;
};

export default PreviewCard;
