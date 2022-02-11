import { styled } from '../stitches.config';
import { Alert } from './Alert';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const StyledPostBox = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '2rem',
  '@xl': {
    width: '700px',
    margin: '0 auto',
    padding: '2rem 1rem 1rem 1rem',
  },
});
const StyledImages = styled('div', {
  display: 'flex',
  minHeight: '25vh',
});
const ImageContainer = styled('div', {
  flex: 1,
  display: 'block',
  position: 'relative',
  '& + div': {
    marginLeft: '1rem',
  },
});
const StyledImage = styled(Image, {
  borderRadius: '$image',
});
const StyledText = styled('p', {
  margin: '0 0 0.5rem 0',
  fontSize: '1.05rem',
  whiteSpace: 'pre-line',
  lineHeight: '1.1rem',
});
const StyledDate = styled('span', {
  margin: '0.5rem 0 0.5rem 0',
  fontSize: '0.85rem',
  color: '$gray9',
});
const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '@md': {
    flexDirection: 'row',
  },
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
function PostText({ content }) {
  return <StyledText>{content}</StyledText>;
}

export function Musing({ posts, removePost, publishPost, privatePost }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const orderedListOfPosts = posts.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    setContent(orderedListOfPosts);
  }, [posts]);

  return (
    <>
      {content &&
        content.map((post) => (
          <StyledPostBox key={post.id}>
            <PostText content={post.post} />
            {post.files !== null ? (
              <StyledImages>
                {post.files.map((url) => (
                  <ImageContainer key={url}>
                    <StyledImage
                      layout='fill'
                      objectFit='cover'
                      objectPosition='25% 25%'
                      placeholder='blur'
                      blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkOAYAAMwAyBFrrNoAAAAASUVORK5CYII='
                      src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${url}`}
                      onError={(e) => (e.target.src = './missing.jpg')}
                      alt='image here'
                    />
                  </ImageContainer>
                ))}
              </StyledImages>
            ) : null}

            <PostDate date={post.created_at} />
            <ButtonGroup>
              {post.public ? (
                <Alert privatePost={privatePost} postId={post.id} />
              ) : (
                <Alert publishPost={publishPost} postId={post.id} />
              )}
              <Alert removePost={removePost} postId={post.id} />
            </ButtonGroup>
          </StyledPostBox>
        ))}
    </>
  );
}
