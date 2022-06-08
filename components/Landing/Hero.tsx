import Link from 'next/link';

import { styled } from '../../stitches.config';

const HeroBox = styled('div', {
  backgroundColor: 'white',
  borderRadius: '$image',
  padding: '2rem',
  height: '50vh',
  overflow: 'hidden',
  position: 'relative',
  boxShadow: '$low',
});

const HeroText = styled('div', {
  '@lg': {
    width: '50%',
  },
});

const HeroHeader = styled('h2', {
  margin: 0,
  color: '$blue10',
  fontFamily: '$alt',
});

const HeroSubHeader = styled('h3', {
  margin: 0,
  fontWeight: 400,
  fontFamily: '$body',
});

const SignIn = styled('a', {
  $$mainColor: 'var(--colors-blue10)',
  display: 'inline-block',
  marginTop: '1rem',
  paddingTop: '0.25rem',
  paddingBottom: '0.25rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  border: '2px solid $$mainColor',
  borderRadius: '999px',
  color: '$$mainColor',
  fontWeight: '700',
  fontFamily: '$alt',
  transition: 'background-color ease-in-out 0.2s, color ease-in-out 0.2s',
  '&:hover': {
    backgroundColor: '$$mainColor',
    color: 'white',
  },
});

const HeroImage = styled('img', {
  position: 'absolute',
  width: '100%',
  top: '60%',
  left: 0,
  pointerEvents: 'none',
  '@md': {
    top: '50%',
  },
  '@media screen and (min-width: 400px)': {
    top: '40%',
  },
  '@lg': {
    top: '20%',
  },
  '@xl': {
    top: 0,
  },
});

const Hero = ({ title, subtitle, prompt }) => {
  return (
    <HeroBox>
      <HeroText>
        <HeroHeader>{title}</HeroHeader>
        <HeroSubHeader>{subtitle}</HeroSubHeader>
        <Link href='/sign_in' passHref>
          <SignIn>
            {prompt}
            <svg
              width='20'
              height='10'
              viewBox='0 0 15 15'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2.14645 11.1464C1.95118 11.3417 1.95118 11.6583 2.14645 11.8536C2.34171 12.0488 2.65829 12.0488 2.85355 11.8536L6.85355 7.85355C7.04882 7.65829 7.04882 7.34171 6.85355 7.14645L2.85355 3.14645C2.65829 2.95118 2.34171 2.95118 2.14645 3.14645C1.95118 3.34171 1.95118 3.65829 2.14645 3.85355L5.79289 7.5L2.14645 11.1464ZM8.14645 11.1464C7.95118 11.3417 7.95118 11.6583 8.14645 11.8536C8.34171 12.0488 8.65829 12.0488 8.85355 11.8536L12.8536 7.85355C13.0488 7.65829 13.0488 7.34171 12.8536 7.14645L8.85355 3.14645C8.65829 2.95118 8.34171 2.95118 8.14645 3.14645C7.95118 3.34171 7.95118 3.65829 8.14645 3.85355L11.7929 7.5L8.14645 11.1464Z'
                fill='currentColor'
                fillRule='evenodd'
                clipRule='evenodd'
              ></path>
            </svg>
          </SignIn>
        </Link>
      </HeroText>
      <HeroImage src='./hero-images/deviceframe.png' />
    </HeroBox>
  );
};

export default Hero;
