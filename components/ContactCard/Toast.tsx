import { Dispatch, SetStateAction } from 'react';

import * as ToastBase from '@radix-ui/react-toast';

import { styled } from '../../stitches.config';

const ToastView = styled(ToastBase.Viewport, {
  position: 'fixed',
  bottom: 0,
  left: 0,
  margin: 0,
  marginBottom: '5vh',
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: 10,
  width: '100%',
  maxWidth: '100vw',
  listStyle: 'none',
  zIndex: 999,
});
const ToastRoot = styled(ToastBase.Root, {
  backgroundColor: '$gray1',
  borderRadius: '$image',
  padding: '$button',
  boxShadow: '$high',
  width: '390px',
  margin: '0 auto',
});
const ToastTitle = styled(ToastBase.Title, {
  fontWeight: 'bold',
});
const ToastButton = styled(ToastBase.Close, {
  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: '$gray12',
  color: '$gray1',
  minHeight: '2rem',
  borderRadius: '$button',
  fontSize: '1em',
  minWidth: '$button',
  padding: '$button',
  variants: {
    version: {
      reverse: {
        backgroundColor: '$gray1',
        color: '$gray12',
        border: '1px solid $gray12',
        '&:hover': {
          backgroundColor: '$gray12',
          color: '$gray1',
        },
      },
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
        visibility: 'hidden',
      },
    },
    loading: {
      true: {
        cursor: 'not-allowed',
        opacity: 0.7,
      },
    },
  },
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
    border: '1px solid $gray12',
  },
  '&:active': {
    transform: 'scale(0.95)',
  },
});
const Description = styled(ToastBase.Description, {
  padding: '0.5rem 0',
});

type ToastProps = {
  title: string;
  description: string;
  close: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
};

function Toast({ open, setOpen, title, description, close }: ToastProps) {
  return (
    <ToastBase.Provider duration={5000} swipeDirection={'down'}>
      <ToastRoot open={open} onOpenChange={setOpen}>
        <ToastTitle>{title}</ToastTitle>
        <Description>{description}</Description>
        <ToastButton>{close}</ToastButton>
      </ToastRoot>

      <ToastView />
    </ToastBase.Provider>
  );
}

export default Toast;
