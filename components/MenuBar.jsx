import { Settings } from './Settings';
import { styled } from '../stitches.config';
import Link from 'next/link';
import Globals from '../locales/en/strings';
import { useState, useContext, useEffect } from 'react';
import { UserContext } from '../pages/_app';
import { supabase } from '../lib/supabaseClient';
import Avatar from './Avatar';
import { useRouter } from 'next/router';

const Menu = styled('nav', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '1fr 1fr',
  '@md': {
    gridTemplateColumns: '10fr 5fr 4rem',
    gridTemplateRows: '1fr',
  },
});
const Title = styled('h1', {
  gridColumn: '1 / span 2',
  margin: '0.5rem 0',
  minWidth: '100%',
  fontFamily: '$accent',
  fontSize: '1.8em',
  fontWeight: '700',
  '& > a': {
    color: '$gray12',
    padding: '0.5rem 0',
    '&:hover': {
      color: '$gray1',
      backgroundColor: '$gray12',
      borderRadius: '$button',
    },
  },
  '@md': {
    gridColumn: '1',
    gridRow: '1',
    alignSelf: 'center',
  },
});
const AvatarItem = styled('div', {
  gridColumn: '1',
  gridRow: '2',
  alignSelf: 'center',
  '@md': {
    gridColumn: '2',
    gridRow: '1',
    justifySelf: 'end',
  },
});
const SettingsItem = styled('div', {
  gridColumn: '2',
  gridRow: '2',
  justifySelf: 'end',
  alignSelf: 'center',
  '@md': {
    gridColumn: '3',
    gridRow: '1',
  },
});
const AvatarGroup = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  '& > span:last-of-type': {
    order: 1,
  },
  '@md': {
    '& > span:last-of-type': {
      order: 2,
    },
  },
});
const AvatarLabel = styled('span', {
  order: 2,
  marginLeft: '0.5rem',
  color: '$gray12',
  borderBottom: '2px solid transparent',
  '&:hover': {
    borderBottom: '2px solid $gray12',
  },
  '@md': {
    order: 1,
    marginLeft: 0,
    marginRight: '0.5rem',
  },
});
const SignInLabel = styled('a', {
  color: '$gray12',
  borderBottom: '2px solid transparent',
  '&:hover': {
    borderBottom: '2px solid $gray12',
  },
});

export function MenuBar() {
  const router = useRouter();
  const [avatar, setAvatar] = useState(null);
  const [name, setName] = useState(null);
  const userId = useContext(UserContext);

  useEffect(() => {
    if (userId !== null) getAvatar();

    async function getAvatar() {
      let { data, error } = await supabase
        .from('profiles')
        .select(`avatar_url, pubName`)
        .eq('id', userId)
        .single();
      if (error) {
        throw error;
      }
      setAvatar(data.avatar_url);
      setName(data.pubName);
    }
  }, [userId]);

  return (
    <Menu>
      <Title>
        <Link href='/'>
          <a>{Globals.title}</a>
        </Link>
      </Title>
      <AvatarItem>
        {userId !== null && (
          <Link href={`/user/${name}`} passHref>
            <AvatarGroup>
              {name && <AvatarLabel>{name}</AvatarLabel>}
              {avatar && <Avatar url={avatar} size={30} />}
            </AvatarGroup>
          </Link>
        )}

        {userId === null && router.pathname !== '/sign_in' ? (
          <Link href='/sign_in' passHref>
            <SignInLabel>Sign In</SignInLabel>
          </Link>
        ) : null}
      </AvatarItem>

      <SettingsItem>
        <Settings />
      </SettingsItem>
    </Menu>
  );
}
