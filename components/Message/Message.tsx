import { styled } from '../../stitches.config';
import MessageAlert from './MessageAlert';
import MessageDate from './MessageDate';
import MessageImage from './MessageImage';
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
  },
});

function PostText({ content }) {
  return <StyledText>{content}</StyledText>;
}

function Message({ posts, removePost, publishPost, privatePost }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const orderedListOfPosts = posts.sort(
      (a, b) => +new Date(b.created_at) - +new Date(a.created_at)
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
                  <MessageImage key={url} url={url} />
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
                />
              ) : (
                <MessageAlert
                  publishPost={publishPost}
                  postId={post.id}
                  removePost={undefined}
                  privatePost={undefined}
                />
              )}
              <MessageAlert
                removePost={removePost}
                postId={post.id}
                publishPost={undefined}
                privatePost={undefined}
              />
            </ButtonGroup>
          </StyledPostBox>
        ))}
    </>
  );
}

export default Message;
