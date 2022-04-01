import Link from 'next/link';

import { keyframes, styled } from '../../stitches.config';

const circleAppear = keyframes({
  from: { transform: 'translate3d(0)', opacity: 0 },
  to: { transform: 'translate3d(175px,100px,100px)', opacity: 1 },
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
const Container = styled('div', {
  display: 'flex',
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: 'fit-content',
  margin: '20vh auto',
  [`&:hover > ${Circle}`]: {
    animation: `${circleAppear} 1000ms ease-in-out forwards`,
  },
  [`&:hover > ${Cone}`]: {
    animation: `${coneAppear} 1000ms ease-in-out forwards`,
  },
  [`&:hover > ${Donut}`]: {
    animation: `${donutAppear} 1000ms ease-in-out forwards`,
  },
  [`&:hover > ${Cube}`]: {
    animation: `${cubeAppear} 1000ms ease-in-out forwards`,
  },
  [`&:hover > ${DistantCircle}`]: {
    animation: `${distantCircleAppear} 1000ms ease-in-out forwards`,
  },
});
const PseudoButton = styled('a', {
  cursor: 'pointer',
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
  borderRadius: '999px',
  minWidth: '25rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '7rem',
  fontWeight: 'bold',
  color: '$gray1',
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
