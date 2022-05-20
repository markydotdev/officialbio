import { styled } from '../../stitches.config';
import Alert from '../Alert';
import strings from '../../locales/en/strings';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const LinkBox = styled('div', {
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
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
const Text = styled('div', {
  flex: 1,
  paddingLeft: '1rem',
});
const LinkText = styled('p', {
  margin: 0,
  fontSize: '$base',
  whiteSpace: 'pre-line',
  lineHeight: '1.1rem',
  '& + &': {
    paddingTop: '0.5rem',
  },
});
const Icon = styled('button', {
  border: 'none',
  backgroundColor: 'transparent',
  transition: '$main',
  padding: 0,
  margin: 0,
  cursor: 'grab',
  variants: {
    purpose: {
      drag: {
        cursor: 'grab',
        '&:active': {
          cursor: 'grabbing',
        },
      },
      close: {
        cursor: 'pointer',
      },
    },
  },
  '&:hover': {
    transform: 'scale(1.1)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
  '& > svg': {
    width: 25,
    height: 25,
  },
});

const DragHandle = ({ listeners, attributes }) => {
  return (
    <Icon purpose='drag' {...listeners} {...attributes}>
      <svg
        width='15'
        height='15'
        viewBox='0 0 15 15'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M5.5 4.625C6.12132 4.625 6.625 4.12132 6.625 3.5C6.625 2.87868 6.12132 2.375 5.5 2.375C4.87868 2.375 4.375 2.87868 4.375 3.5C4.375 4.12132 4.87868 4.625 5.5 4.625ZM9.5 4.625C10.1213 4.625 10.625 4.12132 10.625 3.5C10.625 2.87868 10.1213 2.375 9.5 2.375C8.87868 2.375 8.375 2.87868 8.375 3.5C8.375 4.12132 8.87868 4.625 9.5 4.625ZM10.625 7.5C10.625 8.12132 10.1213 8.625 9.5 8.625C8.87868 8.625 8.375 8.12132 8.375 7.5C8.375 6.87868 8.87868 6.375 9.5 6.375C10.1213 6.375 10.625 6.87868 10.625 7.5ZM5.5 8.625C6.12132 8.625 6.625 8.12132 6.625 7.5C6.625 6.87868 6.12132 6.375 5.5 6.375C4.87868 6.375 4.375 6.87868 4.375 7.5C4.375 8.12132 4.87868 8.625 5.5 8.625ZM10.625 11.5C10.625 12.1213 10.1213 12.625 9.5 12.625C8.87868 12.625 8.375 12.1213 8.375 11.5C8.375 10.8787 8.87868 10.375 9.5 10.375C10.1213 10.375 10.625 10.8787 10.625 11.5ZM5.5 12.625C6.12132 12.625 6.625 12.1213 6.625 11.5C6.625 10.8787 6.12132 10.375 5.5 10.375C4.87868 10.375 4.375 10.8787 4.375 11.5C4.375 12.1213 4.87868 12.625 5.5 12.625Z'
          fill='currentColor'
          fillRule='evenodd'
          clipRule='evenodd'
        ></path>
      </svg>
    </Icon>
  );
};

const TriggerButton = () => {
  return (
    <Icon purpose='close'>
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
    </Icon>
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
      <DragHandle listeners={listeners} attributes={attributes} />
      <Text>
        <LinkText>{display}</LinkText>
        <LinkText>{link}</LinkText>
      </Text>
      <Alert
        title={strings.linkPage.title_remove}
        description={strings.linkPage.description_remove}
        action={handleRemove}
        actionTitle={strings.linkPage.confirm_remove}
        triggerButton={TriggerButton}
      />
    </LinkBox>
  );
};

export default ProfileLink;
