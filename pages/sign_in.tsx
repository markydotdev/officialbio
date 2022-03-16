import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

export default function SignIn() {
  return (
    <Layout>
      <AuthForm />
    </Layout>
  );
}

// TODO: Add check if user is already signed in, redirect to other page
