import Link from 'next/link';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import Avatar from '../Avatar';
import Tooltip from '../Tooltip';

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
  return (
    <AvatarItem>
      <Link href={`/user/${name}`} passHref>
        <AvatarGroup>
          {name && (
            <Tooltip side={undefined} message={strings.settings.userTooltip}>
              <AvatarLabel>{name}</AvatarLabel>
            </Tooltip>
          )}
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
    </AvatarItem>
  );
}

export default User;
