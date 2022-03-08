import { styled } from '../stitches.config';

const StyledFooter = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
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

export const Footer = () => {
  return (
    <StyledFooter>
      Illustration by
      <FooterLink href='https://icons8.com/illustrations/author/zD2oqC8lLBBA'>
        Icons 8
      </FooterLink>
      from
      <FooterLink href='https://icons8.com/illustrations'>Ouch!</FooterLink>
    </StyledFooter>
  );
};
