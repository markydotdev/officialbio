import strings from '../../locales/en/strings';
import Feature from './Feature';
import Start from './Start';
import { styled } from '../../stitches.config';

const Box = styled('div', {
  height: '45vh',
  overflowY: 'scroll',
  scrollSnapType: 'y mandatory',
});
const Snap = styled('div', {
  height: '100%',
  scrollSnapAlign: 'start',
});

function Landing() {
  return (
    <>
      <Start>{strings.start}</Start>
      <Box>
        {strings.features.map((feature) => (
          <Snap key={feature.id}>
            <Feature {...feature} />
          </Snap>
        ))}
      </Box>
    </>
  );
}

export default Landing;
