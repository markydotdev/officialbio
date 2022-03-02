import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import ThirdPartyGrid from './ThirdPartyGrid';
import strings from '../locales/en/strings';
import { styled } from '../stitches.config';
import GenericPrompt from './GenericPrompt';

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
  cursor: 'pointer',
});
const ThirdPartySpacer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '& > button + button': {
    marginTop: '0.5rem',
  },
});

function AlertMessage({ active, message, error, handleClose }) {
  return (
    <GenericPrompt
      active={active}
      message={message}
      error={error}
      handleClose={handleClose}
    />
  );
}

export default function Auth({}) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [prompt, setPrompt] = useState({
    enabled: false,
    message: '',
    error: false,
  });

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      const { error, user } = await supabase.auth.signIn(
        { email },
        { redirectTo: 'http://localhost:3000/setup' }
      );
      if (error) throw error;
      setPrompt({
        enabled: true,
        message: 'Check your email for the magic link',
        error: false,
      });
    } catch (error) {
      console.log('Error thrown:', error.message);
      setPrompt({ enabled: true, message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPrompt({ enabled: false, message: '', error: false });
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

      <AlertMessage
        active={prompt.enabled}
        message={prompt.message}
        error={prompt.error}
        handleClose={handleClose}
      />
    </AuthContainer>
  );
}
