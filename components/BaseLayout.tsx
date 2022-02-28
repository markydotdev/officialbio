import { MenuBar } from './MenuBar';
import { styled } from '../stitches.config';

const Container = styled('main', {
  marginTop: '1rem',
  '@lg': {
    margin: '1rem auto 0',
    maxWidth: '80vw',
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export function BaseLayout({ children }) {
  return (
    <>
      <MenuBar />
      <Container>{children}</Container>
    </>
  );
}
