import Layout from '../components/Layout';
import Landing from '../components/Landing';

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
    </Layout>
  );
}
