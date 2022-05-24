import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

import strings from '../../locales/en/strings';
import { UserContext } from 'utils/UserContext';
import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';
import Tooltip from '../Tooltip';
import Pages from './Pages';

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
  marginTop: '0.5rem',
  border: '2px solid white',
  borderRadius: '$button',
  boxShadow: '$medium',
});
const StyledItem = styled(DropdownMenu.Item, {
  display: 'block',
  borderRadius: '$button',
  '&:focus-visible': {
    outline: 'none',
    color: '$gray1',
    backgroundColor: '$gray12',
    a: {
      color: '$gray1',
    },
  },
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
const Separator = styled(DropdownMenu.Separator, {
  height: 1,
  backgroundColor: '$gray7',
  margin: '0.5rem',
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
      <Tooltip side={false} message={strings.settings.settings}>
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
      </Tooltip>

      <StyledContent loop>
        {userId === null && (
          <StyledItem onSelect={() => router.push('/sign_in')}>
            <StyledLink>{strings.settings.signIn}</StyledLink>
          </StyledItem>
        )}

        {userId !== null && (
          <>
            {Pages.sort((a, b) => a.order - b.order).map((page) => (
              <StyledItem
                key={page.order}
                onSelect={() =>
                  router.push(
                    page.unique ? `/${page.slug}/${name}` : `/${page.slug}`
                  )
                }
              >
                <StyledLink>{page.name}</StyledLink>
              </StyledItem>
            ))}
            <Separator />
            <StyledItem onSelect={() => handleSignOut()}>
              <StyledLink>{strings.settings.signOut}</StyledLink>
            </StyledItem>
          </>
        )}
      </StyledContent>
    </DropdownMenu.Root>
  );
}

export default Settings;
