import { styled } from '../../stitches.config';
import Alert from '../Alert';
import strings from '../../locales/en/strings';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const LinkBox = styled('div', {
  display: 'flex',
  width: '100%',
  flexDirection: 'column',
  justifyContent: 'space-between',
  marginTop: '1rem',
  borderRadius: '$image',
  padding: '1rem 0.75rem 0.5rem 0.75rem',
  backgroundColor: '$gray3',
  boxShadow: '$low',
  variants: {
    public: {
      true: {
        border: '2px solid $green10',
        backgroundColor: '$green4',
      },
    },
  },
  '@xl': {
    margin: '0.5rem auto 0 auto',
  },
});
const LinkText = styled('a', {
  margin: '0 0 0.5rem 0',
  fontSize: '$base',
  whiteSpace: 'pre-line',
  lineHeight: '1.1rem',
});
const ButtonGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  '@md': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
const TriggerIcon = styled('button', {
  border: 'none',
  backgroundColor: 'transparent',
  transition: '$main',
  padding: 0,
  margin: 0,
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
  '& > svg': {
    width: 20,
    height: 20,
  },
});

const TriggerButton = () => {
  return (
    <TriggerIcon type='button'>
      <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M0.877075 7.49988C0.877075 3.84219 3.84222 0.877045 7.49991 0.877045C11.1576 0.877045 14.1227 3.84219 14.1227 7.49988C14.1227 11.1575 11.1576 14.1227 7.49991 14.1227C3.84222 14.1227 0.877075 11.1575 0.877075 7.49988ZM7.49991 1.82704C4.36689 1.82704 1.82708 4.36686 1.82708 7.49988C1.82708 10.6329 4.36689 13.1727 7.49991 13.1727C10.6329 13.1727 13.1727 10.6329 13.1727 7.49988C13.1727 4.36686 10.6329 1.82704 7.49991 1.82704ZM9.85358 5.14644C10.0488 5.3417 10.0488 5.65829 9.85358 5.85355L8.20713 7.49999L9.85358 9.14644C10.0488 9.3417 10.0488 9.65829 9.85358 9.85355C9.65832 10.0488 9.34173 10.0488 9.14647 9.85355L7.50002 8.2071L5.85358 9.85355C5.65832 10.0488 5.34173 10.0488 5.14647 9.85355C4.95121 9.65829 4.95121 9.3417 5.14647 9.14644L6.79292 7.49999L5.14647 5.85355C4.95121 5.65829 4.95121 5.3417 5.14647 5.14644C5.34173 4.95118 5.65832 4.95118 5.85358 5.14644L7.50002 6.79289L9.14647 5.14644C9.34173 4.95118 9.65832 4.95118 9.85358 5.14644Z'
          fill='currentColor'
          fillRule='evenodd'
          clipRule='evenodd'
        ></path>
      </svg>
    </TriggerIcon>
  );
};

const ProfileLink = ({ id, linkId, display, link, removeLink }) => {
  const { setNodeRef, listeners, attributes, transform, transition } =
    useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleRemove = () => {
    removeLink(linkId);
  };
  // Have to use sortablecontext here...
  return (
    <LinkBox ref={setNodeRef} style={style}>
      <LinkText href={link}>{display}</LinkText>
      <ButtonGroup>
        <button {...listeners} {...attributes}>
          Drag handle
        </button>
        <Alert
          title={strings.linkPage.title_remove}
          description={strings.linkPage.description_remove}
          action={handleRemove}
          actionTitle={strings.linkPage.confirm_remove}
          triggerButton={TriggerButton}
        />
      </ButtonGroup>
    </LinkBox>
  );
};

export default ProfileLink;
