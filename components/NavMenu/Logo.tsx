import Link from 'next/link';

import Globals from '../../locales/en/strings';
import { styled } from '../../stitches.config';

const Title = styled('h1', {
  gridColumn: '1 / span 2',
  margin: '0.5rem 0',
  minWidth: '100%',
  fontFamily: '$accent',
  fontSize: '$md',
  fontWeight: '700',
  '& > a': {
    color: '$gray12',
    padding: '0.5rem 0',
    '&:hover': {
      color: '$gray1',
      backgroundColor: '$gray12',
      borderRadius: '$button',
    },
  },
  '@md': {
    gridColumn: '1',
    gridRow: '1',
    alignSelf: 'center',
  },
});

function Logo() {
  return (
    <Title>
      <Link href='/' passHref>
        <a>{Globals.title}</a>
      </Link>
    </Title>
  );
}

export default Logo;
