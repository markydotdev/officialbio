import { styled } from '../../stitches.config';
import NavMenu from '../NavMenu';
import Footer from './Footer';

const Container = styled('main', {
  marginTop: '1rem',
  '@lg': {
    margin: '1rem 0',
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
