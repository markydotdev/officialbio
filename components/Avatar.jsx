import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { DEFAULT_AVATARS_BUCKET } from '../lib/constants';
import * as BaseAvatar from '@radix-ui/react-avatar';
import { styled } from '../stitches.config';

const StyledBase = styled(BaseAvatar.Root, {
  display: 'inline-flex',
  borderRadius: '100%',
  variants: {
    type: {
      square: {
        height: '100%',
        borderRadius: '$button',
      },
    },
  },
});
const StyledImage = styled(BaseAvatar.Image, {
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  borderRadius: 'inherit',
});
const StyledFallback = styled(BaseAvatar.Fallback, {
  backgroundColor: '$gray1',
  width: '100%',
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '$gray12',
});

export default function Avatar({ url, size, type, initials }) {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .createSignedUrl(path, 120);
      if (data) {
        setAvatarUrl(data.signedURL);
      }
    } catch (error) {
      console.log('Error downloading image: ', error.message);
    }
  }
  if (type === 'square') {
    return (
      <StyledBase style={{ width: size }} type={type}>
        <StyledImage src={avatarUrl} />
        <StyledFallback delayMs={500}>{initials}</StyledFallback>
      </StyledBase>
    );
  }
  return (
    <StyledBase style={{ width: size, height: size }} type={type}>
      <StyledImage src={avatarUrl} />
      <StyledFallback delayMs={500}>{initials}</StyledFallback>
    </StyledBase>
  );
}
