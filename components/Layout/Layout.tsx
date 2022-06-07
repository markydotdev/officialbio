import { styled } from '../../stitches.config';
import NavMenu from '../NavMenu';
import Footer from './Footer';
import Script from 'next/script';

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
      <Footer minimal={false} />

      <Script
        data-website-id='ccd8df66-a68e-4fe2-aa49-ad5bab85a0c7'
        src='https://umamiocto.netlify.app/umami.js'
      />
    </>
  );
}

export default Layout;
