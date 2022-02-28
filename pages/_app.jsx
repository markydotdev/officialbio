import React from 'react';
import { IdProvider } from '@radix-ui/react-id';
import { supabase } from '../lib/supabaseClient';
import { useEffect, useState } from 'react';
import { globalCss } from '../stitches.config';

const globalStyles = globalCss({
  '@font-face': [
    {
      fontFamily: 'Public Sans',
      src: `url('/fonts/PublicSans/PublicSans-VariableFont_wght.ttf')`,
      fontWeight: '125 900',
      fontStyle: 'normal',
    },
    {
      fontFamily: 'Public Sans',
      src: `url('/fonts/PublicSans/PublicSans-Italic-VariableFont_wght.ttf')`,
      fontWeight: '125 900',
      fontStyle: 'italic',
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
    margin: '0.5rem 1rem',
    overflowX: 'hidden',
  },
  a: {
    textDecoration: 'none',
  },
  'h1, h2, h3, h4': {
    fontFamily: '$accent',
  },
});

export const UserContext = React.createContext();

function MyApp({ Component, pageProps }) {
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
