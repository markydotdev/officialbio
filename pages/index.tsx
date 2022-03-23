import Landing from '../components/Landing';
import Layout from '../components/Layout';

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
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginTop: '2rem',
          marginBottom: '-1rem',
        }}
      >
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
      </div>
    </Layout>
  );
}
