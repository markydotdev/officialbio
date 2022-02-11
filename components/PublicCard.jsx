import { styled } from '../stitches.config';
import { useState, useEffect } from 'react';
import Avatar from './Avatar';
import { Button } from './Button';
import strings from '../locales/en/strings';
import { supabase } from '../lib/supabaseClient';

const CardFlex = styled('div', {
  display: 'flex',
  padding: '1rem',
  backgroundColor: '$gray1',
  borderRadius: '$button',
  boxShadow: '$low',
});
const CardArticle = styled('article', {
  marginLeft: '0.5rem',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
});
const Title = styled('h2', {
  margin: '0 0 0.5rem 0',
});
const Description = styled('h3', {
  margin: '0',
  fontWeight: 'normal',
  fontSize: 'medium',
  fontFamily: '$body',
  lineHeight: '1.2em',
});
const ShareSection = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginTop: '0.5rem',
});
const ShareButton = styled(Button, {});
const TempMessage = styled('span', {
  color: 'green',
  marginLeft: '0.5rem',
});

export const PublicCard = ({ name, avatar }) => {
  const [status, setStatus] = useState(false);
  const [description, setDescription] = useState('');

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const user = supabase.auth.user();
      const { data, error } = await supabase
        .from('profiles')
        .select(`pubName, website, description, avatar_url`)
        .eq('id', user.id)
        .single();
      if (data) {
        setDescription(data.description);
      }
    } catch (error) {
      console.log('Error getting profile: ', error.message);
    }
  };

  const shareLink = () => {
    clear();

    navigator.clipboard.writeText(window.location.href);
    console.log(window.location.href);

    setStatus(true);

    const timer = setTimeout(() => setStatus(false), 4000);

    function clear() {
      clearTimeout(timer);
    }
  };

  return (
    <CardFlex>
      <div>
        <Avatar url={avatar} size={120} type='square' />
      </div>
      <CardArticle>
        <Title>{name}</Title>
        {description && <Description>{description}</Description>}
        <ShareSection>
          <ShareButton onClick={shareLink}>{strings.public.share}</ShareButton>
          {status && <TempMessage>{strings.public.sharedMessage}</TempMessage>}
        </ShareSection>
      </CardArticle>
    </CardFlex>
  );
};
