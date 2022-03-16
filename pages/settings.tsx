import Account from '../components/Account';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';

export default function Profile() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      setSession(user);
    } else {
      router.push('/');
    }
  }, [router]);

  return (
    <Layout>{session && <Account key={session.id} session={session} />}</Layout>
  );
}
