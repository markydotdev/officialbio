import { useState } from 'react';

import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';

const LoginButton = styled('button', {
  textTransform: 'capitalize',
  border: '1px solid transparent',
  borderRadius: '$button',
  padding: '1rem',
  margin: '0.5rem 0',
  color: '$gray1',
  cursor: 'pointer',
  fontWeight: 'bold',
  '&:hover': {
    backgroundColor: 'transparent',
  },
});

const ThirdPartySign = ({ id, name, brand }) => {
  const [loading, setLoading] = useState(false);

  const handleThirdPartyLogin = async (provider) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn(
        {
          provider: provider,
        },
        { redirectTo: process.env.NEXT_PUBLIC_URL }
      );
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginButton
      onClick={() => handleThirdPartyLogin(name)}
      type='button'
      css={{
        backgroundColor: brand,
        '&:hover': {
          color: brand,
          border: `1px solid ${brand}`,
        },
      }}
    >
      {name}
    </LoginButton>
  );
};

export default ThirdPartySign;
