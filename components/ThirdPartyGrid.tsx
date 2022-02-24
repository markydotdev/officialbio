import { useState, useEffect } from 'react';
import ThirdPartySign from './ThirdPartySign';
import Placeholder from './Placeholder';
import { styled, theme } from '../stitches.config';
import { supabase } from '../lib/supabaseClient';
import strings from '../locales/en/strings';
import { Button } from './Button';

const ThirdPartyGroup = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  margin: 0,
  padding: 0,
});
const ButtonGroup = styled('li', {
  listStyle: 'none',
  display: 'flex',
  margin: '0.5rem 0',
  justifyContent: 'space-between',
  height: '2.5rem',
});
const StyledLoggedInButton = styled('p', {
  border: 'none',
  borderRadius: '$button',
  alignSelf: 'center',
  backgroundColor: 'transparent',
});
const StyledToggle = styled('button', {
  width: '60px',
  height: '30px',
  border: '2px solid $gray12',
  borderRadius: '9999px',
  position: 'relative',
  '&::before': {
    display: 'block',
    content: "''",
    position: 'absolute',
    top: '2.5px',
    left: '3px',
    right: '60px',
    zIndex: '2',
    width: 20,
    height: 20,
    borderRadius: '9999px',
    transition: 'left 0.2s ease-in-out 0s',
    backgroundColor: '$gray12',
  },
  variants: {
    enabled: {
      true: {
        '&::before': {
          left: '33px',
        },
      },
    },
  },
});
const SecondarySection = styled('div', {
  display: 'flex',
  alignItems: 'center',
});
const NameLabel = styled('p', {
  margin: '0 1rem 0 0',
  padding: 0,
});
const BrandName = styled('span', {
  textTransform: 'capitalize',
});

const ToggleButton = ({ onClick, enabled, id, style }) => {
  return (
    <StyledToggle
      onClick={onClick}
      type='button'
      enabled={enabled}
      aria-pressed={enabled}
      id={id}
      style={style}
    />
  );
};

const LoggedInGroup = ({
  children,
  brand,
  username,
  onClick,
  enabled,
  id,
  loaded,
}) => {
  return loaded ? (
    <ButtonGroup>
      <StyledLoggedInButton style={{ color: brand }}>
        {children}
      </StyledLoggedInButton>
      <SecondarySection>
        <NameLabel>
          {strings.connected.prompt1}{' '}
          <span style={{ color: brand }}>{username}</span>{' '}
          {strings.connected.prompt2}
        </NameLabel>
        <ToggleButton
          onClick={onClick}
          enabled={enabled}
          id={id}
          style={{
            backgroundColor: enabled ? brand : theme.colors.gray1,
            borderColor: enabled && brand,
          }}
        />
      </SecondarySection>
    </ButtonGroup>
  ) : (
    <Placeholder height='2.5rem' margin='0.5rem 0' width={undefined} />
  );
};

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

const ThirdPartyGrid = ({ connectedAccs, contentLoaded }) => {
  const [enabled, setEnabled] = useState(initialState);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(null);
  const user = supabase.auth.user();

  useEffect(() => {
    // Retrieving user's third party accounts on load
    const fetchExternalConnections = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('external_connections')
        .eq('id', user.id);
      const { external_connections } = data[0];
      setEnabled(external_connections);
    };
    if (user !== null) {
      fetchExternalConnections();
    }
  }, [user]);

  const toggleAppearance = async (e) => {
    const alteredConnections = enabled.map((acc) => {
      if (acc.id === e.target.id) {
        return { ...acc, enabled: !acc.enabled };
      } else {
        return acc;
      }
    });
    setEnabled(alteredConnections);
  };

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
      {initialState.map((acc) =>
        connectedAccs.find((account) => account.service === acc.id) !==
        undefined ? (
          <LoggedInGroup
            key={acc.id}
            id={acc.id}
            brand={acc.brand}
            username={
              connectedAccs.find((account) => account.service === acc.id).name
            }
            onClick={(e) => toggleAppearance(e)}
            enabled={enabled.find((el) => el.id === acc.id).enabled}
            loaded={contentLoaded}
          >
            <BrandName>{acc.id}</BrandName>
          </LoggedInGroup>
        ) : (
          <ThirdPartySign
            key={acc.id}
            id={acc.id}
            name={acc.id}
            brand={acc.brand}
          />
        )
      )}

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

export default ThirdPartyGrid;
