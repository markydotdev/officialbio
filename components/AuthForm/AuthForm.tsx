import { useState } from 'react';
import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';
import ExternalSignIn from '../ExternalSignIn';
import Prompt from '../Prompt';
import Link from 'next/link';

const AuthContainer = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$gray1',
  padding: '1.5rem',
  borderRadius: '$image',
  boxShadow: '$low',
  '@lg': {
    width: '500px',
    margin: 'auto',
  },
});
const Header = styled('h2', {
  fontSize: '$base',
  display: 'inline-flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  alignItems: 'baseline',
});
const AlternatePageLink = styled('a', {
  color: '$blue11',
  borderBottom: '2px solid $blue11',
  transition: 'all ease 0.25s',
  '&:hover': {
    color: '$gray12',
    borderBottom: '2px solid $gray12',
  },
});
const Subtitle = styled('h3', {
  fontFamily: '$body',
  fontWeight: 'normal',
  fontSize: '$base',
  marginTop: '2rem',
  marginBottom: '0.5rem',
});
const EmailInput = styled('input', {
  backgroundColor: '$gray5',
  border: 'none',
  padding: '1rem 0.75rem',
  borderRadius: '$button',
});
const PassInput = styled('input', {
  marginTop: '0.5rem',
  backgroundColor: '$gray5',
  border: 'none',
  padding: '1rem 0.75rem',
  borderRadius: '$button',
});
const EmailSubmit = styled('button', {
  backgroundColor: '$gray12',
  color: '$gray1',
  border: '1px solid transparent',
  borderRadius: '$button',
  fontWeight: 'bold',
  fontFamily: '$body',
  fontSize: '$base',
  marginTop: '1rem',
  padding: '1rem',
  cursor: 'pointer',
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
    border: '1px solid $gray12',
  },
});
const ThirdPartySpacer = styled('div', {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.25rem',
  justifyContent: 'space-evenly',
});

function AlertMessage({ active, message, error, handleClose }) {
  return (
    <Prompt
      active={active}
      message={message}
      error={error}
      handleClose={handleClose}
    />
  );
}

interface AuthProps {
  isCreation: boolean;
}

function AuthForm({ isCreation }: AuthProps) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [prompt, setPrompt] = useState({
    enabled: false,
    message: '',
    error: false,
  });

  const handleLogin = async (email, password) => {
    try {
      setLoading(true);
      if (isCreation) {
        const { error, user } = await supabase.auth.signUp(
          { email, password: password },
          {
            redirectTo: `${process.env.NEXT_PUBLIC_URL}/setup`,
          }
        );
        if (error) throw error;
        setPrompt({
          enabled: true,
          message: 'Check your email for verification',
          error: false,
        });
      } else {
        const { error, user } = await supabase.auth.signIn(
          { email, password: password },
          {
            redirectTo: `${process.env.NEXT_PUBLIC_URL}/musings`,
          }
        );
        if (error) throw error;
      }
    } catch (error) {
      setPrompt({ enabled: true, message: error.message, error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPrompt({ enabled: false, message: '', error: false });
  };

  if (isCreation) {
    return (
      <AuthContainer>
        <Header>
          {strings.makeAccount.header}
          <Link passHref href='/sign_in'>
            <AlternatePageLink>{strings.sign.header}</AlternatePageLink>
          </Link>
        </Header>
        <Subtitle>{strings.makeAccount.explanation}</Subtitle>
        <EmailInput
          className='inputField'
          type='email'
          placeholder='name@email.com'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PassInput
          type='password'
          minLength={6}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password (min 6 characters)'
        />
        <EmailSubmit
          onClick={(e) => {
            handleLogin(email, password);
          }}
          className={'button block'}
          disabled={loading}
          aria-label={strings.sign.header}
          type='submit'
        >
          {loading ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img className='loader' src='loader.svg' alt='loading bar' />
          ) : (
            <span>{strings.makeAccount.header}</span>
          )}
        </EmailSubmit>

        <AlertMessage
          active={prompt.enabled}
          message={prompt.message}
          error={prompt.error}
          handleClose={handleClose}
        />
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <Header>
        {strings.sign.header}
        <Link passHref href='/create'>
          <AlternatePageLink>{strings.makeAccount.header}</AlternatePageLink>
        </Link>
      </Header>
      <Subtitle>{strings.sign.explanation}</Subtitle>
      <EmailInput
        className='inputField'
        type='email'
        placeholder='name@email.com'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <PassInput
        type='password'
        minLength={6}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='password (min 6 characters)'
      />
      <EmailSubmit
        onClick={(e) => {
          handleLogin(email, password);
        }}
        className={'button block'}
        disabled={loading}
        aria-label={strings.sign.header}
        type='submit'
      >
        {loading ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className='loader' src='loader.svg' alt='loading bar' />
        ) : (
          <span>{strings.sign.header}</span>
        )}
      </EmailSubmit>
      <Subtitle>{strings.sign.alternative}</Subtitle>
      <ThirdPartySpacer>
        <ExternalSignIn connectedAccs={undefined} />
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

export default AuthForm;
