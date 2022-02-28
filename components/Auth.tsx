import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ThirdPartyGrid from './ThirdPartyGrid';
import strings from '../locales/en/strings';
import { styled } from '../stitches.config';

const AuthContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
});
const Header = styled('h2', {});
const Subtitle = styled('h3', {
  fontFamily: '$body',
  fontWeight: 'normal',
  fontSize: 'medium',
});
const EmailInput = styled('input', {
  width: '100%',
  backgroundColor: '$gray5',
  border: 'none',
  padding: '1rem 0.75rem',
});
const EmailSubmit = styled('button', {
  backgroundColor: '$gray12',
  color: '$gray1',
  border: 'none',
  borderRadius: '$button',
  fontWeight: 'bold',
  marginTop: '1rem',
  padding: '1rem',
});
const ThirdPartySpacer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '& > button + button': {
    marginTop: '0.5rem',
  },
});

export default function Auth({}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      console.log('Error thrown:', error.message);
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContainer>
      <Header>{strings.sign.header}</Header>
      <Subtitle>{strings.sign.explanation}</Subtitle>
      <EmailInput
        className='inputField'
        type='email'
        placeholder='name@email.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <EmailSubmit
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
        className={'button block'}
        disabled={loading}
      >
        {loading ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className='loader' src='loader.svg' alt='loading bar' />
        ) : (
          <span>Send magic link</span>
        )}
      </EmailSubmit>
      <Subtitle>{strings.sign.alternative}</Subtitle>
      <ThirdPartySpacer>
        <ThirdPartyGrid connectedAccs={undefined} contentLoaded={undefined} />
      </ThirdPartySpacer>
    </AuthContainer>
  );
}
