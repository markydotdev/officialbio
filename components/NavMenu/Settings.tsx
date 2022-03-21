import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import { supabase } from '../../lib/supabaseClient';
import strings from '../../locales/en/strings';
import { UserContext } from '../../pages/_app';
import { styled } from '../../stitches.config';

const StyledTrigger = styled(DropdownMenu.Trigger, {
  height: 50,
  fontFamily: 'system-ui',
  border: '2px solid transparent',
  backgroundColor: '$gray12',
  borderRadius: '$button',
  color: '$gray1',
  '&:hover': {
    color: '$gray12',
    backgroundColor: '$gray1',
    border: '2px solid $gray12',
  },
  '&[data-state="open"]': {
    color: '$gray12',
    backgroundColor: '$gray1',
    border: '2px solid $gray12',
  },
});
const StyledMenuSvg = styled('svg', {
  display: 'block',
});
const StyledContent = styled(DropdownMenu.Content, {
  fontFamily: 'system-ui',
  backgroundColor: '$gray1',
  padding: '0.5rem',
  marginTop: '1rem',
  borderRadius: '$button',
  boxShadow: '$medium',
});
const StyledItem = styled(DropdownMenu.Item, {
  display: 'block',
});
const StyledLink = styled('a', {
  display: 'block',
  color: '$gray12',
  padding: '0.5rem',
  userSelect: 'none',
  '&:hover': {
    color: '$gray1',
    backgroundColor: '$gray12',
    borderRadius: '$button',
  },
});
const StyledButton = styled('button', {
  border: 'none',
  backgroundColor: 'initial',
  width: '100%',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  textAlign: 'unset',
  cursor: 'pointer',
  font: 'inherit',
  outline: 'inherit',
  display: 'block',
  color: '$gray12',
  padding: '0.5rem',
  userSelect: 'none',
  '&:hover': {
    color: '$gray1',
    backgroundColor: '$gray12',
    borderRadius: '$button',
  },
});

function Settings() {
  const router = useRouter();
  const [name, setName] = useState(null);
  const userId = useContext(UserContext);

  useEffect(() => {
    async function getName() {
      let { data, error } = await supabase
        .from('profiles')
        .select(`pubName`)
        .eq('id', userId)
        .single();
      if (error) {
        throw error;
      }
      setName(data.pubName);
    }
    if (userId !== null) {
      getName();
    }
  }, [userId]);

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <DropdownMenu.Root>
      <StyledTrigger>
        <StyledMenuSvg
          width='24'
          height='24'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M14 6C14 7.10457 13.1046 8 12 8C10.8954 8 10 7.10457 10 6C10 4.89543 10.8954 4 12 4C13.1046 4 14 4.89543 14 6Z'
            fill='currentColor'
          />
          <path
            d='M14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 10.8954 10.8954 10 12 10C13.1046 10 14 10.8954 14 12Z'
            fill='currentColor'
          />
          <path
            d='M14 18C14 19.1046 13.1046 20 12 20C10.8954 20 10 19.1046 10 18C10 16.8954 10.8954 16 12 16C13.1046 16 14 16.8954 14 18Z'
            fill='currentColor'
          />
        </StyledMenuSvg>
      </StyledTrigger>

      <StyledContent loop>
        {userId !== null && (
          <StyledItem onSelect={() => router.push(`/user/${name}`)}>
            <Link href={`/user/${name}`} passHref>
              <StyledLink>{strings.settings.publicProfile}</StyledLink>
            </Link>
          </StyledItem>
        )}

        {userId === null && (
          <StyledItem onSelect={() => router.push('/sign_in')}>
            <Link href='/sign_in' passHref>
              <StyledLink>{strings.settings.signIn}</StyledLink>
            </Link>
          </StyledItem>
        )}

        {userId !== null && (
          <StyledItem onSelect={() => router.push(`/musings`)}>
            <Link href='/musings' passHref>
              <StyledLink>{strings.settings.posts}</StyledLink>
            </Link>
          </StyledItem>
        )}

        {userId !== null && (
          <StyledItem onSelect={() => router.push(`/settings`)}>
            <Link href='/settings' passHref>
              <StyledLink>{strings.settings.settings}</StyledLink>
            </Link>
          </StyledItem>
        )}

        {userId !== null && (
          <StyledItem onSelect={() => handleSignOut()}>
            <StyledButton onClick={() => handleSignOut()}>
              {strings.settings.signOut}
            </StyledButton>
          </StyledItem>
        )}
      </StyledContent>
    </DropdownMenu.Root>
  );
}

export default Settings;
