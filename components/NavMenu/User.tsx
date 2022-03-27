import Link from 'next/link';
import { useRouter } from 'next/router';

import { styled } from '../../stitches.config';
import Avatar from '../Avatar';

const AvatarItem = styled('div', {
  gridColumn: '1',
  gridRow: '2',
  alignSelf: 'center',
  '@md': {
    gridColumn: '2',
    gridRow: '1',
    justifySelf: 'end',
  },
});
const AvatarGroup = styled('a', {
  display: 'inline-flex',
  alignItems: 'center',
  '& > span:last-of-type': {
    order: 1,
  },
  '@md': {
    paddingRight: '1rem',
    '& > span:last-of-type': {
      order: 2,
    },
  },
});

const AvatarLabel = styled('span', {
  order: 2,
  marginLeft: '0.5rem',
  color: '$gray12',
  borderBottom: '2px solid transparent',
  '&:hover': {
    borderBottom: '2px solid $gray12',
  },
  '@md': {
    order: 1,
    marginLeft: 0,
    marginRight: '0.5rem',
  },
});
const SignInLabel = styled('a', {
  color: '$gray12',
  borderBottom: '2px solid transparent',
  fontWeight: '500',
  '&:hover': {
    borderBottom: '2px solid $gray12',
  },
});

function User({ name, avatar }) {
  const router = useRouter();
  console.log(name);

  return (
    <AvatarItem>
      <Link href={`/user/${name}`} passHref>
        <AvatarGroup>
          {name && <AvatarLabel>{name}</AvatarLabel>}
          {avatar && (
            <Avatar
              url={avatar}
              size={30}
              type={undefined}
              initials={undefined}
            />
          )}
        </AvatarGroup>
      </Link>

      {name === null && router.pathname !== '/sign_in' ? (
        <Link href='/sign_in' passHref>
          <SignInLabel>Sign In</SignInLabel>
        </Link>
      ) : null}
    </AvatarItem>
  );
}

export default User;
