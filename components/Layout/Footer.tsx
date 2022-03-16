import { styled } from '../../stitches.config';

const StyledFooter = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
  marginBottom: '2rem',
  '@supports (margin-bottom: env(safe-area-inset-bottom))': {
    marginBottom: 'calc(1.5rem + env(safe-area-inset-bottom))',
  },
});
const FooterLink = styled('a', {
  margin: '0 0.25rem',
  borderBottom: '2px solid $gray12',
  color: '$gray12',
  '&:visited': {
    color: '$gray12',
  },
  '&:hover': {
    backgroundColor: '$gray12',
    color: '$gray1',
  },
});

const Footer = () => {
  return <StyledFooter>Made with love</StyledFooter>;
};

export default Footer;
