import Link from 'next/link';

import { styled } from '../../stitches.config';

const HeroBox = styled('div', {
  display: 'flex',
  minHeight: '30vh',
  flexDirection: 'column',
  backgroundColor: '$red4',
  borderRadius: '$button',
  padding: '1rem',
  boxShadow: '$low',
  marginBottom: '2.5rem',
  '@xl': {
    width: '75vw',
    margin: '0 auto 4rem auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridTemplateRows: 'repeat(3, 1fr)',
    alignItems: 'center',
  },
});
const HeroTitle = styled('h2', {
  margin: 0,
  fontSize: '$minFluid',
  order: 1,
  '@md': {
    fontSize: '$fluid',
    order: 2,
  },
  '@xl': {
    gridRow: '1',
    gridColumn: '1 / -1',
  },
  '@xxl': {
    fontSize: '$maxFluid',
  },
});
const HeroDescription = styled('p', {
  order: 2,
  '@md': {
    marginTop: '0.5rem',
    marginBottom: 0,
    fontSize: '1.1em',
  },
  '@lg': {
    fontSize: '1.3em',
  },
  '@xl': {
    gridRow: '2',
    alignSelf: 'end',
  },
  '@xxl': {
    fontSize: '1.5em',
  },
});
const HeroImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  order: 3,
  marginLeft: '15px',
  '@md': {
    width: '250px',
    margin: '0 auto',
    order: 1,
  },
  '@xl': {
    gridColumn: 2,
    gridRow: '1 / -1',
  },
});
const HeroButton = styled('a', {
  width: '100%',
  border: '2px solid $gray12',
  textAlign: 'center',
  transition: 'all 0.1s ease-in-out',
  fontWeight: '500',
  order: 4,
  backgroundColor: '$gray12',
  marginTop: '1rem',
  padding: '0.5rem',
  borderRadius: '$button',
  color: '$red4',
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
  },
  '@lg': {
    width: '200px',
  },
  '@xl': {
    fontSize: '1.3em',
    width: '250px',
    gridRow: '3',
    height: 'fit-content',
    alignSelf: 'baseline',
    '> svg': {
      height: 15,
      marginLeft: '0.5rem',
    },
  },
});


const Hero = ({ title, subtitle, prompt }) => {
  return (
    <HeroBox>
      <HeroTitle>{title}</HeroTitle>
      <HeroDescription>{subtitle}</HeroDescription>
      <Link href='/sign_in' passHref>
        <HeroButton>
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
        </HeroButton>
      </Link>

      <HeroImage src='/hero-images/explore.png' alt='hero' />

    </HeroBox>
  );
};

export default Hero;
