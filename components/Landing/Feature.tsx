import { styled } from '../../stitches.config';

const FeatureContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: 'white',
  borderRadius: '$image',
  padding: '2rem',
  margin: '0 auto',
  boxShadow: '$low',
});
const FeatureText = styled('div', {
  flex: 2,
});
const FeatureTitle = styled('h3', {
  margin: '0',
  fontSize: '$lg',
  fontFamily: '$alt',
  fontWeight: '800',
  variants: {
    color: {
      purple: {
        color: '$violet10',
      },
      red: {
        color: '$red10',
      },
      green: {
        color: '$green10',
      },
    },
  },
});
const FeatureDesc = styled('p', {
  fontWeight: '400',
  marginTop: '0.25rem',
  marginBottom: '1rem',
});
const FeatureImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  flex: 2,
  pointerEvents: 'none',
});

const Feature = ({ name, summary, image, color }) => {
  return (
    <FeatureContainer>
      <FeatureText>
        <FeatureTitle color={color}>{name}</FeatureTitle>
        <FeatureDesc>{summary}</FeatureDesc>
      </FeatureText>

      <FeatureImage src={image} alt={name} />
    </FeatureContainer>
  );
};

export default Feature;
