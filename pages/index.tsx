import { BaseLayout } from '../components/BaseLayout';
import Landing from '../components/Landing';

export default function Home({ error }) {
  if (error) {
    return (
      <BaseLayout>
        <h1>{error.message}</h1>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Landing />
    </BaseLayout>
  );
}

export async function getServerSideProps({ req }) {
  return { props: {} };
}
