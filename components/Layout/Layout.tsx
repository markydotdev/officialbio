import NavMenu from '../NavMenu';
import Footer from './Footer';
import { styled } from '../../stitches.config';

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

function Layout({ children }) {
  return (
    <>
      <NavMenu />
      <Container>{children}</Container>
      <Footer />
    </>
  );
}

export default Layout;
