import { styled } from '../../stitches.config';

const StyledButton = styled('button', {
  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: '$gray12',
  color: '$gray1',
  height: '2.5rem',
  borderRadius: '$button',
  fontSize: '$base',
  minWidth: '$button',
  padding: '$button',
  lineHeight: 'unset',
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
        filter: 'opacity(0.2)',
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

const Button = ({ children, onClick, type, disabled, version, loading }) => {
  return (
    <StyledButton
      onClick={onClick}
      type={type ? type : 'button'}
      disabled={disabled}
      version={version}
      loading={loading}
    >
      {children}
    </StyledButton>
  );
};

export default Button;
