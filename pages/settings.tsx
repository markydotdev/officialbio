import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import AccountSettings from '../components/AccountSettings';
import Layout from '../components/Layout';
import { supabase } from '../lib/supabaseClient';

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
    <Layout>
      {session && <AccountSettings key={session.id} session={session} />}
    </Layout>
  );
}
