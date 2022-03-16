import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import { supabase } from '../../lib/supabaseClient';
import { UserContext } from '../../pages/_app';
import { styled } from '../../stitches.config';
import Avatar from '../Avatar';
import Logo from './Logo';
import Settings from './Settings';

const Menu = styled('nav', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '1fr 1fr',
  '@md': {
    gridTemplateColumns: '10fr 5fr',
    gridTemplateRows: '1fr',
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
    paddingRight: '1rem',
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
  fontWeight: '500',
  '&:hover': {
    borderBottom: '2px solid $gray12',
  },
});

function NavMenu() {
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
      <Logo />
      <AvatarItem>
        {userId !== null && (
          <Link href={`/user/${name}`} passHref>
            <AvatarGroup>
              {name && <AvatarLabel>{name}</AvatarLabel>}
              {avatar && (
                <Avatar
                  url={avatar}
                  size={30}
                  type={undefined}
                  initials={undefined}
                />
              )}
            </AvatarGroup>
          </Link>
        )}

        {userId === null && router.pathname !== '/sign_in' ? (
          <Link href='/sign_in' passHref>
            <SignInLabel>Sign In</SignInLabel>
          </Link>
        ) : null}
      </AvatarItem>

      {userId !== null && (
        <SettingsItem>
          <Settings />
        </SettingsItem>
      )}
    </Menu>
  );
}

export default NavMenu;
