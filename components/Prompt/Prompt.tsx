import { useState } from 'react';

import * as RadixPrompt from '@radix-ui/react-dialog';

import { styled } from '../../stitches.config';

const StyledOverlay = styled(RadixPrompt.Overlay, {
  backgroundColor: '$gray11',
  position: 'fixed',
  inset: 0,
});
const Content = styled(RadixPrompt.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '450px',
  maxHeight: '85vh',
  padding: 25,
});
const CloseButton = styled(RadixPrompt.Close, {
  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: '$gray12',
  color: '$gray1',
  minHeight: '2rem',
  borderRadius: '$button',
  fontSize: '$base',
  minWidth: '$button',
  padding: '$button',
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
    border: '1px solid $gray12',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});

type PromptTypes = {
  active: boolean;
  message: string;
  error: boolean;
  handleClose: () => void;
};

const Prompt = ({ active, message, error, handleClose }: PromptTypes) => {
  return (
    <RadixPrompt.Root open={active}>
      <RadixPrompt.Portal>
        <StyledOverlay></StyledOverlay>
        <Content>
          <RadixPrompt.Title>{error ? 'Error' : 'Heads up'}</RadixPrompt.Title>
          <RadixPrompt.Description>{message}</RadixPrompt.Description>
          <CloseButton onClick={() => handleClose()}>Close</CloseButton>
        </Content>
      </RadixPrompt.Portal>
    </RadixPrompt.Root>
  );
};

export default Prompt;
