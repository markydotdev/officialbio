import { styled } from '../../stitches.config';

const LinkBox = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '1rem',
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
const LinkText = styled('a', {
  margin: '0 0 0.5rem 0',
  fontSize: '$base',
  whiteSpace: 'pre-line',
  lineHeight: '1.1rem',
});
//   const ButtonGroup = styled('div', {
//     display: 'flex',
//     flexDirection: 'column',
//     '@md': {
//       flexDirection: 'row',
//       justifyContent: 'space-between',
//     },
//   });

const ProfileLink = ({ linkId, display, link, removeLink }) => {
  // Have to use sortablecontext here...
  return (
    <LinkBox>
      <LinkText href={link}>{display}</LinkText>
      <button type='button' onClick={() => removeLink(linkId)}>
        remove
      </button>
    </LinkBox>
  );
};

export default ProfileLink;
