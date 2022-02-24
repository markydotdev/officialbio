import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { styled } from '../stitches.config';

const LoginButton = styled('button', {
  textTransform: 'capitalize',
  border: 'none',
  borderRadius: '$button',
  padding: '1rem',
  margin: '0.5rem 0',
  color: '$gray1',
  cursor: 'pointer',
  fontWeight: 'bold',
});

const ThirdPartySign = ({ id, name, brand }) => {
  const [loading, setLoading] = useState(false);

  const handleThirdPartyLogin = async (provider) => {
    try {
      setLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        provider: provider,
      });
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
      style={{ backgroundColor: brand }}
    >
      {name}
    </LoginButton>
  );
};

export default ThirdPartySign;
