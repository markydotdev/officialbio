import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

export default function Create() {
  return (
    <Layout>
      <AuthForm isCreation={true} />
    </Layout>
  );
}
