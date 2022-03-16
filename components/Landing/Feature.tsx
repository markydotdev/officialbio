import { styled } from '../../stitches.config';

const FeatureContainer = styled('div', {
  display: 'flex',
  margin: '0.5rem 0',
});
const FeatureText = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  flex: 2,
});
const FeatureTitle = styled('h3', {
  fontWeight: 'bold',
  margin: '0',
  fontSize: '$minFluid',
  '@md': {
    fontSize: '$fluid',
  },
  '@xxl': {
    fontSize: '$maxFluid',
  },
});
const ImageContainer = styled('div', {
  flex: 1,
});
const FeatureImage = styled('img', {
  width: '100%',
  height: '100%',
  objectFit: 'contain',
});

const Feature = ({ name, summary, image }) => {
  return (
    <FeatureContainer>
      <FeatureText>
        <FeatureTitle>{name}</FeatureTitle>
        <p>{summary}</p>
      </FeatureText>

      <ImageContainer>
        <FeatureImage src={image} alt={name} />
      </ImageContainer>
    </FeatureContainer>
  );
};

export default Feature;