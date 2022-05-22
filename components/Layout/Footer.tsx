import { styled } from '../../stitches.config';
import Link from 'next/link';

const StyledFooter = styled('footer', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '3rem',
  marginBottom: '1rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  backgroundColor: '$gray4',
  borderRadius: '$image',
  width: '100%',
  position: 'relative',
  '@supports (padding-bottom: env(safe-area-inset-bottom))': {
    paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
  },
});
const StyledLink = styled('a', {
  fontWeight: 'bold',
  fontFamily: '$accent',
  color: '$gray12',
});

const Footer = ({ minimal }) => {
  if (minimal) {
    return (
      <StyledFooter>
        <Link href='/' passHref>
          <StyledLink>OfficialBio</StyledLink>
        </Link>
        <p>Made in 2022</p>
      </StyledFooter>
    );
  }
  return <StyledFooter>Made in 2022</StyledFooter>;
};

export default Footer;
