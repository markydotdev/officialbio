import { styled } from '../stitches.config';

const StyledButton = styled('button', {
  cursor: 'pointer',
  border: '1px solid transparent',
  backgroundColor: '$gray12',
  color: '$gray1',
  minHeight: '2rem',
  borderRadius: '$button',
  cursor: 'pointer',
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
});

export const Button = ({
  children,
  onClick,
  type,
  disabled,
  version,
  loading,
}) => {
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
