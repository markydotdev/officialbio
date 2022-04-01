import Link from 'next/link';

import { keyframes, styled } from '../../stitches.config';

const circleAppear = keyframes({
  '0%': { transform: 'translate3d(0)', opacity: 0 },
  '100%': { transform: 'translate3d(175px,100px,100px)', opacity: 1 },
});
const donutAppear = keyframes({
  from: { transform: 'translate3d(0)', opacity: 0 },
  to: { transform: 'translate3d(100px,-150px,100px)', opacity: 1 },
});
const cubeAppear = keyframes({
  from: { transform: 'translate3d(0)', opacity: 0 },
  to: { transform: 'translate3d(350px,-200px,100px)', opacity: 1 },
});
const coneAppear = keyframes({
  from: { transform: 'translate3d(0)', opacity: 0 },
  to: { transform: 'translate3d(-300px,50px,100px)', opacity: 1 },
});
const distantCircleAppear = keyframes({
  from: { transform: 'translate3d(0)', opacity: 0 },
  to: { transform: 'translate3d(-200px,-100px,100px)', opacity: 1 },
});

const BaseShape = styled('div', {
  opacity: 0,
  zIndex: -1,
  backgroundSize: 'contain',
  backgroundRepeat: 'no-repeat',
  position: 'absolute',
  top: '20%',
  left: '25%',
  userSelect: 'none',
});
const Donut = styled(BaseShape, {
  backgroundImage: `url("./hero-images/donut.png")`,
  width: '300px',
  height: '100%',
});
const Circle = styled(BaseShape, {
  zIndex: 0,
  backgroundImage: `url("./hero-images/circle.png")`,
  width: '30vw',
  height: '30vh',
  filter: 'blur(4px)',
});
const Cone = styled(BaseShape, {
  backgroundImage: `url("./hero-images/cone.png")`,
  width: '200px',
  height: '100%',
});
const Cube = styled(BaseShape, {
  backgroundImage: `url("./hero-images/cube.png")`,
  width: '250px',
  height: '100%',
});
const DistantCircle = styled(BaseShape, {
  backgroundImage: `url("./hero-images/distant_circle.png")`,
  width: '75px',
  height: '100%',
});
const PseudoButton = styled('a', {
  position: 'relative',
  borderRadius: '999px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  fontWeight: '500',
  color: '$gray12',
  backgroundImage: `linear-gradient(
    155deg,
    hsl(279deg 83% 46%) 0%,
    hsl(277deg 84% 43%) 10%,
    hsl(275deg 85% 39%) 20%,
    hsl(273deg 87% 36%) 30%,
    hsl(271deg 90% 33%) 40%,
    hsl(269deg 93% 29%) 50%,
    hsl(278deg 95% 31%) 60%,
    hsl(285deg 95% 32%) 70%,
    hsl(292deg 95% 34%) 80%,
    hsl(298deg 92% 36%) 90%,
    hsl(303deg 88% 40%) 100%
  )`,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  '@md': {
    fontSize: '3.5rem',
  },
});
const Container = styled('div', {
  cursor: 'pointer',
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20vh auto',
  minWidth: '20rem',
  borderRadius: '999px',
  background:
    'linear-gradient($gray4, $gray4) padding-box, linear-gradient(155deg, hsl(279deg 83% 46%) 0%, hsl(277deg 84% 43%) 10%, hsl(275deg 85% 39%) 20%, hsl(273deg 87% 36%) 30%, hsl(271deg 90% 33%) 40%, hsl(269deg 93% 29%) 50%, hsl(278deg 95% 31%) 60%, hsl(285deg 95% 32%) 70%, hsl(292deg 95% 34%) 80%, hsl(298deg 92% 36%) 90%, hsl(303deg 88% 40%) 100%) border-box',
  border: '0.25rem solid transparent',
  transition: 'all 1000ms ease-in-out',
  '&:hover': {
    transition: 'all 1000ms ease-in-out',
  },
  '&::before': {
    position: 'absolute',
    content: '',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 0,
    opacity: 0,
    transition: 'opacity 0.2s linear',
    backgroundImage: `linear-gradient(
      155deg,
      hsl(279deg 83% 46%) 0%,
      hsl(277deg 84% 43%) 10%,
      hsl(275deg 85% 39%) 20%,
      hsl(273deg 87% 36%) 30%,
      hsl(271deg 90% 33%) 40%,
      hsl(269deg 93% 29%) 50%,
      hsl(278deg 95% 31%) 60%,
      hsl(285deg 95% 32%) 70%,
      hsl(292deg 95% 34%) 80%,
      hsl(298deg 92% 36%) 90%,
      hsl(303deg 88% 40%) 100%
    )`,
    borderRadius: '75px',
    // Needed to prevent the very tiny lines around the object from appearing due to the gradient magic happening
    margin: '-2px',
  },
  '&:hover::before': {
    opacity: 1,
  },
  [`&:hover ${PseudoButton}`]: {
    WebkitTextFillColor: 'unset',
    color: '$gray4',
  },
  [`&:hover > ${Circle}`]: {
    // Changing normal to reverse does reverse the animation but the timing is off and doesn't work on hover
    // Maybe I should be setting this by JS instead
    animation: `${circleAppear} 1000ms ease-in-out forwards normal`,
  },
  [`&:hover > ${Cone}`]: {
    animation: `${coneAppear} 1000ms ease-in-out forwards normal`,
  },
  [`&:hover > ${Donut}`]: {
    animation: `${donutAppear} 1000ms ease-in-out forwards normal`,
  },
  [`&:hover > ${Cube}`]: {
    animation: `${cubeAppear} 1000ms ease-in-out forwards normal`,
  },
  [`&:hover > ${DistantCircle}`]: {
    animation: `${distantCircleAppear} 1000ms ease-in-out forwards normal`,
  },
  '@md': {
    border: '0.5rem solid transparent',
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

      <Donut />
      <Circle />
      <Cone />
      <Cube />
      <DistantCircle />
    </Container>
  );
}

export default Start;
