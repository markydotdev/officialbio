import Layout from '../components/Layout';
import Image from 'next/image';
import { styled } from '../stitches.config';

const Styled404 = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
});

export default function Custom404() {
  return (
    <Layout>
      <Styled404>
        <h2>404 - Page cannot be found</h2>
        <Image
          src='/ghost.png'
          alt='cute 404 ghost'
          width={200}
          height={200}
          layout={'fixed'}
        />
      </Styled404>
    </Layout>
  );
}
