import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

export default function SignIn() {
  return (
    <Layout>
      <AuthForm isCreation={false} />
    </Layout>
  );
}
