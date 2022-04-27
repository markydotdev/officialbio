import { ExternalLinkIcon } from '@radix-ui/react-icons';

import { styled } from '../../stitches.config';

const GenericLink = styled('a', {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '$gray1',
  padding: '1rem',
  borderRadius: '$image',
  boxShadow: '$low',
  color: '$gray12',
  transition: '$main',
  '&:hover': {
    transform: 'scale(1.02)',
  },
  '& svg': {
    width: '1.2rem',
    height: '1.2rem',
  },
  '& + &': {
    marginTop: '0.5rem',
  },
});

const ContactExtras = ({ links }) => {
  return links.map((link) => {
    switch (link.type) {
      case 'link':
        return (
          <GenericLink key={link.id} href={link.text}>
            <span>{link.text}</span>
            <ExternalLinkIcon />
          </GenericLink>
        );
      default:
        break;
    }
  });
};

export default ContactExtras;
