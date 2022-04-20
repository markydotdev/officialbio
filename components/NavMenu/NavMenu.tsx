import { useContext, useEffect, useState } from 'react';

import { UserContext } from '../../pages/_app';
import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';
import Logo from './Logo';
import Settings from './Settings';
import User from './User';

const Menu = styled('nav', {
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gridTemplateRows: '1fr 1fr',
  '@md': {
    gridTemplateColumns: '10fr 5fr',
    gridTemplateRows: '1fr',
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

function NavMenu() {
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
      {userId !== null && <User name={name} avatar={avatar} />}

      <SettingsItem>
        <Settings />
      </SettingsItem>
    </Menu>
  );
}

export default NavMenu;
