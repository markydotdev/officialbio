import { styled } from '../../stitches.config';
import NavMenu from '../NavMenu';
import Footer from './Footer';

const Container = styled('main', {
  marginTop: '1rem',
  '@lg': {
    margin: '1rem auto 0',
    minHeight: '80vh',
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
