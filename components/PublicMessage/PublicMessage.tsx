import { useState } from 'react';

import { styled } from '../../stitches.config';

const ArticleContainer = styled('article', {
  marginTop: '1.5rem',
  borderRadius: '0.25rem',
});
const StyledText = styled('p', {
  whiteSpace: 'pre-line',
  width: '100%',
  margin: 0,
  marginBottom: '0.5rem ',
});
const ImageBlock = styled('ul', {
  display: 'flex',
  flexWrap: 'wrap',
  margin: 0,
  padding: 0,
});
const ImageItem = styled('li', {
  height: '20vh',
  flexGrow: '1',
  listStyle: 'none',
  marginBottom: '0.25rem',
  '&:last-of-type': {
    marginBottom: '0.5rem',
  },
  '@media (min-width: 800px)': {
    '& + li': {
      marginLeft: '0.5rem',
    },
  },
});
const Image = styled('img', {
  height: '100%',
  width: '100%',
  objectFit: 'cover',
  objectPosition: '50% 25%',
  borderRadius: '0.25rem',
});
const LargeImageBlock = styled('div', {
  zIndex: 10,
  position: 'fixed',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  height: '100vh',
  minHeight: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.3)',
  backdropFilter: 'blur(4px)',
});
const LargeImage = styled('img', {
  position: 'relative',
  maxWidth: '100%',
  maxHeight: '100%',
  zIndex: 11,
});
const StyledDate = styled('span', {
  fontSize: '0.8em',
  fontStyle: 'italic',
});

function PostDate({ date }) {
  const stylizedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = new Date(date);
  const today = new Date();
  const difference = today.getTime() - formattedDate.getTime();
  const days = difference / (1000 * 3600 * 24);
  const daysString = days > 1 ? `${Math.trunc(days)} days ago` : stylizedDate;

  return <StyledDate>{daysString}</StyledDate>;
}

function PublicMessage({ makePrivate, post }) {
  const [open, setOpen] = useState(false);
  const [imageShown, setImageShown] = useState('');

  // TODO: Convert into react hook to reuse ?
  const handleImageZoom = (image) => {
    if (open) {
      setOpen(false);
      setImageShown('');
    } else {
      setImageShown(image);
      setOpen(true);
    }
  };

  return (
    <ArticleContainer>
      <StyledText>{post.post}</StyledText>

      <ImageBlock>
        {post.files &&
          post.files.map((image) => (
            <ImageItem key={image}>
              <Image
                onClick={() => handleImageZoom(image)}
                src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${image}`}
                alt='User uploaded image'
              />
            </ImageItem>
          ))}
        {open ? (
          <LargeImageBlock onClick={handleImageZoom}>
            <LargeImage
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageShown}`}
            />
          </LargeImageBlock>
        ) : null}
      </ImageBlock>

      <PostDate date={post.updated_at} />
    </ArticleContainer>
  );
}

export default PublicMessage;
