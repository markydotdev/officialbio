import { keyframes, styled } from '../stitches.config';

const loading = keyframes({
  from: { backgroundPosition: '100% 50%' },
  to: { backgroundPosition: '0% 50%' },
});

const StyledPlaceholder = styled('div', {
  display: 'block',
  position: 'relative',
  backgroundColor: '$gray4',
  borderRadius: '$button',
  backgroundImage: 'linear-gradient(90deg, $gray4 25%, $gray6 37%, $gray4 63%)',
  backgroundSize: '400% 100%',
  backgroundPosition: '100% 50%',
  animation: `${loading} 1.4s ease infinite`,
});

const Placeholder = ({ height, margin, width }) => {
  return (
    <StyledPlaceholder
      style={{ height: height, margin: margin, width: width || '100%' }}
      data-testid='placeholder'
    />
  );
};

export default Placeholder;
