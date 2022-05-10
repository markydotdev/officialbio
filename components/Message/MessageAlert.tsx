import * as AlertPrompt from '@radix-ui/react-alert-dialog';
import {
  CrossCircledIcon,
  EyeOpenIcon,
  LockClosedIcon,
} from '@radix-ui/react-icons';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import Tooltip from '../Tooltip';

const StyledOverlay = styled(AlertPrompt.Overlay, {
  backgroundColor: 'rgba(0, 0, 0, 0.90)',
  inset: '0',
  position: 'fixed',
  zIndex: 2,
});
const StyledTrigger = styled(AlertPrompt.Trigger, {
  display: 'flex',
  cursor: 'pointer',
  color: '$gray12',
  border: 'none',
  padding: 0,
  alignItems: 'center',
  backgroundColor: '$gray3',
  variants: {
    public: {
      true: {
        backgroundColor: '$green4',
        color: '$green10',
      },
    },
  },
  '&:hover': {
    '& > svg': {
      transform: 'scale(0.9)',
    },
  },
});
const AlertContent = styled(AlertPrompt.Content, {
  isolation: 'isolate',
  zIndex: 3,
  position: 'fixed',
  top: '50%',
  left: '50%',
  backgroundColor: '$gray1',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  transform: 'translate(-50%, -50%)',
  padding: '1rem',
  borderRadius: '0.25rem',
});
const AlertTitle = styled(AlertPrompt.Title, {
  margin: 0,
});
const AlertDescription = styled(AlertPrompt.Description, {});
const AlertButtons = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});
const AlertCancelButton = styled(AlertPrompt.Cancel, {
  cursor: 'pointer',
  minHeight: '2rem',
  borderRadius: '$button',
  fontSize: '$base',
  padding: '$button',
  backgroundColor: '$gray1',
  color: '$gray12',
  border: '2px solid $gray12',
  '&:hover': {
    backgroundColor: '$gray12',
    color: '$gray1',
  },
});
const AlertDeleteButton = styled(AlertPrompt.Action, {
  cursor: 'pointer',
  border: '2px solid transparent',
  backgroundColor: '$gray12',
  color: '$gray1',
  minHeight: '2rem',
  borderRadius: '$button',
  fontSize: '$base',
  minWidth: '$button',
  padding: '$button',
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
    border: '2px solid $gray12',
  },
});
const PublicSpan = styled('span', {
  color: '$green10',
  fontSize: '$sm',
});
const BasicIconStyles = {
  width: '1.45rem',
  height: '1.45rem',
  transition: 'all 0.2s ease-in-out',
};
const StyledEye = styled(EyeOpenIcon, {
  ...BasicIconStyles,
  color: '$green10',
  backgroundColor: '$green4',
  marginRight: '4px',
});
const StyledLock = styled(LockClosedIcon, {
  ...BasicIconStyles,
  color: '$gray12',
  backgroundColor: '$gray3',
});
const StyledClose = styled(CrossCircledIcon, {
  ...BasicIconStyles,
  color: '$gray12',
  backgroundColor: '$gray3',
  variants: {
    publicMessage: {
      true: {
        color: '$green10',
        backgroundColor: '$green4',
      },
    },
  },
});

function Overlay({ children }) {
  return (
    <AlertPrompt.Root>
      <StyledOverlay />
      {children}
    </AlertPrompt.Root>
  );
}

function MessageAlert({
  publishPost,
  removePost,
  privatePost,
  postId,
  publicMessage,
}) {
  if (privatePost) {
    return (
      <Overlay>
        <Tooltip side={false} message={strings.private.button}>
          <StyledTrigger public={true}>
            <StyledEye />
          </StyledTrigger>
        </Tooltip>
        <PublicSpan>{strings.private.info}</PublicSpan>

        <AlertContent>
          <AlertTitle>{strings.private.prompt}</AlertTitle>
          <AlertDescription>{strings.private.description}</AlertDescription>
          <AlertButtons>
            <AlertCancelButton>{strings.private.deny}</AlertCancelButton>
            <AlertDeleteButton onClick={() => privatePost(postId)}>
              {strings.private.confirm}
            </AlertDeleteButton>
          </AlertButtons>
        </AlertContent>
      </Overlay>
    );
  }
  if (publishPost) {
    return (
      <Overlay>
        <Tooltip side={false} message={strings.publish.button}>
          <StyledTrigger>
            <StyledLock />
          </StyledTrigger>
        </Tooltip>

        <AlertContent>
          <AlertTitle>{strings.publish.prompt}</AlertTitle>
          <AlertDescription>{strings.publish.description}</AlertDescription>
          <AlertButtons>
            <AlertCancelButton>{strings.publish.deny}</AlertCancelButton>
            <AlertDeleteButton onClick={() => publishPost(postId)}>
              {strings.publish.confirm}
            </AlertDeleteButton>
          </AlertButtons>
        </AlertContent>
      </Overlay>
    );
  }
  return (
    <Overlay>
      <Tooltip side={false} message={strings.delete.button}>
        <StyledTrigger public={publicMessage}>
          <StyledClose publicMessage={publicMessage} />
        </StyledTrigger>
      </Tooltip>

      <AlertContent>
        <AlertTitle>{strings.delete.prompt}</AlertTitle>
        <AlertDescription>{strings.delete.description}</AlertDescription>
        <AlertButtons>
          <AlertCancelButton>{strings.delete.deny}</AlertCancelButton>
          <AlertDeleteButton onClick={() => removePost(postId)}>
            {strings.delete.confirm}
          </AlertDeleteButton>
        </AlertButtons>
      </AlertContent>
    </Overlay>
  );
}

export default MessageAlert;
