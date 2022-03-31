import Link from 'next/link';

import { styled } from '../../stitches.config';

const Container = styled('div', {
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '55vh',
});
const PseudoButton = styled('a', {
  all: 'unset',
  cursor: 'pointer',
  backgroundImage: `linear-gradient(
    155deg,
    hsl(265deg 95% 37%) 2%,
    hsl(267deg 94% 37%) 25%,
    hsl(269deg 93% 36%) 34%,
    hsl(271deg 93% 36%) 41%,
    hsl(272deg 92% 36%) 45%,
    hsl(274deg 92% 36%) 50%,
    hsl(276deg 91% 36%) 53%,
    hsl(278deg 91% 35%) 56%,
    hsl(280deg 90% 35%) 59%,
    hsl(281deg 90% 35%) 62%,
    hsl(283deg 89% 35%) 64%,
    hsl(285deg 89% 35%) 66%,
    hsl(287deg 88% 34%) 68%,
    hsl(289deg 88% 34%) 70%,
    hsl(290deg 87% 34%) 72%,
    hsl(292deg 87% 34%) 74%,
    hsl(294deg 86% 33%) 77%,
    hsl(296deg 86% 33%) 79%,
    hsl(298deg 85% 33%) 81%,
    hsl(300deg 85% 33%) 84%,
    hsl(302deg 85% 33%) 89%,
    hsl(304deg 85% 34%) 100%
  )`,
  borderRadius: '999px',
  minWidth: '25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7rem',
  fontWeight: 'bold',
  color: '$gray1',
  transition: 'all 2s ease-in-out',
});
const Donut = styled('div', {
  backgroundImage: `url("./hero-images/whiteorange.png")`,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: 0,
  right: 0,
  width: '250px',
  height: '100%',
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

      <Donut />
    </Container>
  );
}

export default Start;
