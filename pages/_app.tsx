import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';

import { IdProvider } from '@radix-ui/react-id';
import { SupabaseClient } from '@supabase/supabase-js';

import { globalCss } from '../stitches.config';
import { supabase } from '../utils/supabaseClient';

import type { User } from '@supabase/supabase-js';
const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Quicksand',
      src: `url('/fonts/Quicksand/Quicksand-Regular.ttf')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Quicksand',
      src: `url('/fonts/Quicksand/Quicksand-Bold.ttf')`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Quicksand',
      src: `url('/fonts/Quicksand/Quicksand-Medium.ttf')`,
      fontWeight: '500',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Syncopate',
      src: `url('/fonts/Syncopate/Syncopate-Regular.ttf')`,
      fontWeight: 'normal',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Syncopate',
      src: `url('/fonts/Syncopate/Syncopate-Bold.ttf')`,
      fontWeight: 'bold',
      fontStyle: 'normal',
    },
  ],
  html: {
    boxSizing: 'border-box',
    backgroundColor: '$gray4',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  body: {
    fontFamily: '$body',
    fontSize: 'clamp(0.95rem, 1vw + 1rem, 1.1rem)',
    margin: '0.5rem 1rem',
    overflowX: 'hidden',
    lineHeight: 1.45,
  },
  a: {
    textDecoration: 'none',
  },
});

type SupabaseContext = {
  sb: SupabaseClient;
  user: User | null;
};

export const UserContext = React.createContext<SupabaseContext>({
  sb: supabase,
  user: null,
});

function MyApp({ Component, pageProps }: AppProps) {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    /* fires when a user signs in or out */
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        handleAuthChange(event, session);
        if (event === 'SIGNED_IN') {
          setUserId(session.user.id);
        }
        if (event === 'SIGNED_OUT') {
          setUserId(null);
        }
      }
    );
    checkUser();
    return () => {
      authListener.unsubscribe();
    };
  }, []);

  async function checkUser() {
    /* when the component loads, checks user to show or hide Sign In link */
    const user = await supabase.auth.user();
    if (user) {
      setUserId(user.id);
    }
  }
  async function handleAuthChange(event, session) {
    /* sets and removes the Supabase cookie */
    await fetch('/api/auth', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify({ event, session }),
    });
  }

  globalStyles();
  return (
    <IdProvider>
      <UserContext.Provider value={userId}>
        <Component {...pageProps} />
      </UserContext.Provider>
    </IdProvider>
  );
}
export default MyApp;
