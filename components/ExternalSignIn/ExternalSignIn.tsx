import { useState } from 'react';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import { supabase } from '../../utils/supabaseClient';
import Button from '../Button';
import ThirdPartySign from './ThirdPartySign';

const ThirdPartyGroup = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
});

const initialState = [
  {
    id: 'twitch',
    brand: '#9146FF',
    enabled: false,
  },
  {
    id: 'discord',
    brand: '#5865F2',
    enabled: false,
  },
  {
    id: 'spotify',
    brand: '#1DB954',
    enabled: false,
  },
];

const ExternalSignIn = ({ connectedAccs }) => {
  const [enabled, setEnabled] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const user = supabase.auth.user();

  const sendToDb = async () => {
    console.log('sent to db');
    console.log(enabled);
    const editedConnections = enabled.map(({ brand, ...rest }) => rest);
    const { data, error } = await supabase
      .from('profiles')
      .update(
        { external_connections: editedConnections },
        { returning: 'minimal' }
      )
      .match({ id: user.id });
  };

  const saveChanges = async () => {
    const newTimer = setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
    clearTimeout(newTimer);
    setButtonDisabled(true);
    await sendToDb();
    setTimer(newTimer);
  };

  if (connectedAccs === undefined) {
    return (
      <>
        {initialState.map((acc) => (
          <ThirdPartySign
            key={acc.id}
            id={acc.id}
            name={acc.id}
            brand={acc.brand}
          />
        ))}
      </>
    );
  }

  return (
    <ThirdPartyGroup>
      {initialState.map((acc) => (
        <ThirdPartySign
          key={acc.id}
          id={acc.id}
          name={acc.id}
          brand={acc.brand}
        />
      ))}

      <Button
        onClick={() => saveChanges()}
        version='reverse'
        disabled={buttonDisabled}
        type={undefined}
        loading={undefined}
      >
        {strings.account.save}
      </Button>
    </ThirdPartyGroup>
  );
};

export default ExternalSignIn;
