import Landing from '../components/Landing';
import Layout from '../components/Layout';
import { styled } from '../stitches.config';

const TemporaryFooter = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginTop: '2rem',
  marginBottom: '-1rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  paddingLeft: '1rem',
  paddingRight: '1rem',
  backgroundColor: '$gray6',
  borderRadius: '$image',
  width: 'fit-content',
});

export default function Home({ error }) {
  if (error) {
    return (
      <Layout>
        <h1>{error.message}</h1>
      </Layout>
    );
  }

  return (
    <Layout>
      <Landing />
      <TemporaryFooter>
        Illustration by
        <a
          style={{
            margin: '0 0.25rem',
            color: 'black',
            borderBottom: '1px solid black',
          }}
          href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'
        >
          Icons 8
        </a>
        from
        <a
          style={{
            margin: '0 0.25rem',
            color: 'black',
            borderBottom: '1px solid black',
          }}
          href='https://icons8.com/illustrations'
        >
          Ouch!
        </a>
      </TemporaryFooter>
    </Layout>
  );
}
