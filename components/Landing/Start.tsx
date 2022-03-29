import Link from 'next/link';

import { styled } from '../../stitches.config';

const Container = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '55vh',
});
const PseudoButton = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  backgroundColor: '$blue6',
  borderRadius: '999px',
  minWidth: '25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7rem',
  fontWeight: 'bold',
  color: '$gray1',
  transition: 'all 0.4s ease-in-out',
  '&:hover': {
    backgroundColor: '$blue11',
  },
});

type StartProps = {
  children?: React.ReactNode;
};

function Start({ children }: StartProps) {
  return (
    <Container>
      <Link href='/' passHref>
        <PseudoButton>{children}</PseudoButton>
      </Link>
    </Container>
  );
}

export default Start;
