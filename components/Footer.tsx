import { styled } from '../stitches.config';

const StyledFooter = styled('footer', {
  display: 'flex',
  justifyContent: 'center',
});
const FooterLink = styled('a', {
  margin: '0 0.25rem',
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
