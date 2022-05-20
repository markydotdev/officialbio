import { styled } from '../../stitches.config';

const StyledFooter = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
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

const Footer = () => {
  return <StyledFooter>Made in 2022</StyledFooter>;
};

export default Footer;
