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
  backgroundImage:
    'linear-gradient( 109.6deg,  rgba(116,18,203,1) 11.2%, rgba(230,46,131,1) 91.2% )',
  borderRadius: '999px',
  minWidth: '25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7rem',
  fontWeight: 'bold',
  color: '$gray1',
  transition: 'all 2s ease-in-out',
  '&:hover': {
    backgroundImage:
      'linear-gradient( 310.6deg,  rgba(100,0,233,0.94) 6.8%, rgba(166,0,188,0.66) 57.8% );',
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
