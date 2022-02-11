import { styled } from '../stitches.config';
import Link from 'next/link';

const HeroContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  marginBottom: '10vh',
  '@media (min-width: 800px)': {},
});
const HeroText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gridColumn: '1 / span 3',
  gridRow: '1 / span 2',
  zIndex: '1',
});
const HeroTitle = styled('h2', {
  margin: 0,
  fontSize: '$minFluid',
  '@md': {
    fontSize: '$fluid',
  },
  '@xxl': {
    fontSize: '$maxFluid',
  },
});
const HeroImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',
  gridColumn: '4 / -1',
  gridRow: '1 / span 2',
  '@media (min-width: 800px)': {
    width: '40vw',
  },
});
const HeroButton = styled('a', {
  width: 'fit-content',
  color: '$gray12',
  borderBottom: '2px solid $gray12',
  textAlign: 'center',
  padding: '0.5rem 0',
  transition: 'all 0.1s ease-in-out',
  '&:hover': {
    backgroundColor: '$gray12',
    padding: '0.5rem 0.15rem 0.5rem 0.5rem',
    borderRadius: '$button',
    color: '$gray1',
  },
});

export const Hero = ({ title, subtitle, prompt }) => {
  return (
    <HeroContainer>
      <HeroText>
        <HeroTitle>{title}</HeroTitle>
        <p>{subtitle}</p>
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
      </HeroText>

      <HeroImage src='/03.png' alt='hero' />
    </HeroContainer>
  );
};
