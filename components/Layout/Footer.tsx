import { styled } from '../../stitches.config';

const StyledFooter = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '5rem',
  marginBottom: '1rem',
  paddingTop: '2rem',
  paddingBottom: '2rem',
  backgroundColor: '$gray7',
  borderRadius: '$image',
  width: '100%',
  position: 'relative',
  boxShadow: 'rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset',
  '@supports (padding-bottom: env(safe-area-inset-bottom))': {
    paddingBottom: 'calc(2rem + env(safe-area-inset-bottom))',
  },
});
// const FooterLink = styled('a', {
//   margin: '0 0.25rem',
//   borderBottom: '2px solid $gray12',
//   color: '$gray12',
//   '&:visited': {
//     color: '$gray12',
//   },
//   '&:hover': {
//     backgroundColor: '$gray12',
//     color: '$gray1',
//   },
// });

const Footer = () => {
  return <StyledFooter>Made with love</StyledFooter>;
};

export default Footer;
