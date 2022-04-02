import { Key, useEffect, useState } from 'react';

import { styled } from '../../stitches.config';
import ImageZoom from '../ImageZoom';
import MessageAlert from './MessageAlert';
import MessageDate from './MessageDate';
import MessageImage from './MessageImage';

const StyledPostBox = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '2rem',
  borderRadius: '$image',
  padding: '1rem 0.75rem 0.5rem 0.75rem',
  backgroundColor: '$gray3',
  boxShadow: '$low',
  variants: {
    public: {
      true: {
        border: '2px solid $green10',
        backgroundColor: '$green4',
      },
    },
  },
  '@xl': {
    margin: '0.5rem auto 0 auto',
  },
});
const StyledImages = styled('div', {
  display: 'flex',
  minHeight: '25vh',
});
const StyledText = styled('p', {
  margin: '0 0 0.5rem 0',
  fontSize: '1.05rem',
  whiteSpace: 'pre-line',
  lineHeight: '1.1rem',
});
const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

function PostText({ content }) {
  return <StyledText>{content}</StyledText>;
}

function Message({ posts, removePost, publishPost, privatePost }) {
  const [content, setContent] = useState(null);
  const [open, setOpen] = useState(false);
  const [imageShown, setImageShown] = useState(null);

  useEffect(() => {
    const orderedListOfPosts = posts.sort(
      (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
    );
    setContent(orderedListOfPosts);
  }, [posts]);

  const handleImageZoom = (image: Key) => {
    if (open) {
      setOpen(false);
      setImageShown('');
    } else {
      setImageShown(image);
      setOpen(true);
    }
  };

  return (
    <>
      {content &&
        content.map((post) => (
          <StyledPostBox key={post.id} public={post.public}>
            <PostText content={post.post} />
            {post.files !== null ? (
              <StyledImages>
                {post.files.map((url) => (
                  <MessageImage
                    key={url}
                    url={url}
                    onClick={() => handleImageZoom(url)}
                  />
                ))}
              </StyledImages>
            ) : null}

            <MessageDate date={post.created_at} />
            <ButtonGroup>
              {post.public ? (
                <MessageAlert
                  privatePost={privatePost}
                  postId={post.id}
                  publishPost={undefined}
                  removePost={undefined}
                  publicMessage={post.public}
                />
              ) : (
                <MessageAlert
                  publishPost={publishPost}
                  postId={post.id}
                  removePost={undefined}
                  privatePost={undefined}
                  publicMessage={post.public}
                />
              )}
              <MessageAlert
                removePost={removePost}
                postId={post.id}
                publishPost={undefined}
                privatePost={undefined}
                publicMessage={post.public}
              />
            </ButtonGroup>
          </StyledPostBox>
        ))}
      {open ? (
        <ImageZoom
          onClick={handleImageZoom}
          imageSrc={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${imageShown}`}
        />
      ) : null}
    </>
  );
}

export default Message;
