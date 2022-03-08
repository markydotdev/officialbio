import { styled } from '../stitches.config';
import Link from 'next/link';

const HeroContainer = styled('div', {
  display: 'grid',
  gridTemplateColumns: 'repeat(6, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  marginTop: '5vh',
  marginBottom: '10vh',
  minHeight: '40vh',
  '@media (min-width: 800px)': {},
});
const HeroText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  gridColumn: '1 / span 2',
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
const ImageSection = styled('div', {
  position: 'relative',
  gridColumn: '3 / -1',
  gridRow: '1 / span 2',
  justifySelf: 'center',
});
const HeroImage = styled('img', {
  marginLeft: '2rem',
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  objectPosition: 'center',

  '@media (min-width: 800px)': {
    width: '40vw',
  },
});
const HeroBackground = styled('svg', {
  zIndex: -1,
  position: 'absolute',
  top: 0,
  left: 0,
  width: '60vw',
  transform: 'rotate(190deg)',
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

      <ImageSection>
        <HeroImage src='/hero-images/explore.png' alt='hero' />
        <HeroBackground
          viewBox='0 0 200 200'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fill='#FFD6E8'
            d='M53.1,-65C67.6,-62.5,77.4,-45.4,75,-29.8C72.6,-14.2,58,0,51.6,15.9C45.2,31.8,47,49.5,39.8,62.2C32.5,75,16.3,82.7,0.3,82.3C-15.7,81.9,-31.3,73.3,-37.5,60.2C-43.7,47.1,-40.3,29.6,-38.7,16.8C-37.1,4,-37.2,-4.1,-34.8,-11.2C-32.4,-18.4,-27.4,-24.7,-21.2,-29.8C-15,-35,-7.5,-39.1,5.9,-47.2C19.3,-55.3,38.5,-67.4,53.1,-65Z'
            transform='translate(100 100)'
          />
        </HeroBackground>
      </ImageSection>
    </HeroContainer>
  );
};
