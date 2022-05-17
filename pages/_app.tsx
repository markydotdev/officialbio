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
      fontFamily: 'Inter',
      src: `url('/fonts/Inter/Inter-VariableFont_slnt,wght.ttf')`,
      fontWeight: '125 950',
      fontStretch: '75% 125%',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Exo2',
      src: `url('/fonts/Exo2/Exo2-VariableFont_wght.ttf')`,
      fontWeight: '125 950',
      fontStretch: '75% 125%',
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
    height: '100vh',
  },
  '*, *:before, *:after': {
    boxSizing: 'inherit',
  },
  body: {
    overflowX: 'hidden',
    height: '100%',
    fontFamily: '$body',
    fontSize: '$base',
    lineHeight: 1.45,
    margin: '0',
    // negate radix-ui dropdown adding padding right to body
    paddingRight: '0 !important',
    '& > #__next': {
      padding: '0.5rem 1rem 0 1rem',
    },
  },
  '#__next': {
    minHeight: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  a: {
    textDecoration: 'none',
  },
  main: {
    flex: 1,
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
