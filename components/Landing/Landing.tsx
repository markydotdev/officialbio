import strings from '../../locales/en/strings';
import Feature from './Feature';
import Hero from './Hero';
import { styled } from '../../stitches.config';

const LandingContainer = styled('section', {
  margin: '0 auto',
  '@xl': {
    width: '750px',
  },
  '@xxl': {
    width: '900px',
  },
});

const FeatureGrid = styled('div', {
  display: 'grid',
  gap: '1rem',
  marginTop: '1rem',
  '@lg': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '@xxl': {
    gridTemplateColumns: 'repeat(3, 1fr)',
    '& > div:nth-child(2)': {
      gridColumn: '2 / -1',
    },
  },
  '& > div:nth-child(3)': {
    gridColumn: '1 / -1',
  },
});

function Landing() {
  return (
    <LandingContainer>
      <Hero
        title={strings.landing.title}
        subtitle={strings.landing.subtitle}
        prompt={strings.landing.prompt}
      />

      <FeatureGrid>
        {strings.features.map((feature) => (
          <Feature {...feature} key={feature.id} />
        ))}
      </FeatureGrid>
    </LandingContainer>
  );
}

export default Landing;
