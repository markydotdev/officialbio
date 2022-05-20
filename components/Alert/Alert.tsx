import * as Dialog from '@radix-ui/react-alert-dialog';
import { keyframes, styled } from '../../stitches.config';

const showOverlay = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});
const showContent = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

const Root = styled(Dialog.Root, {});
const Portal = styled(Dialog.Portal, {});
const Overlay = styled(Dialog.Overlay, {
  backgroundColor: '$gray12',
  filter: 'opacity(0.94)',
  position: 'fixed',
  inset: 0,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${showOverlay} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
});
const Content = styled(Dialog.Content, {
  backgroundColor: 'white',
  borderRadius: 6,
  boxShadow:
    'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '500px',
  maxHeight: '85vh',
  padding: 25,
  '@media (prefers-reduced-motion: no-preference)': {
    animation: `${showContent} 150ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
  },
  '&:focus': { outline: 'none' },
});
const Title = styled(Dialog.Title, {
  margin: '0.5rem 0',
});
const Description = styled(Dialog.Description, {});
const ActionGroup = styled('div', {
  display: 'flex',
  justifyContent: 'flex-end',
});
const BUTTON_DEFAULTS = {
  border: '2px solid transparent',
  fontSize: '$base',
  fontFamily: '$body',
  padding: '0.5rem 1rem',
  borderRadius: '$button',
  transition: '$main',
};
const Cancel = styled(Dialog.Cancel, {
  color: '$gray10',
  borderColor: '$gray10',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
    border: '2px solid $gray10',
  },
  ...BUTTON_DEFAULTS,
});
const Action = styled(Dialog.Action, {
  marginLeft: '1rem',
  color: '$red10',
  backgroundColor: '$red4',
  fontWeight: 'bold',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    transform: 'scale(0.95)',
    border: '2px solid $red10',
  },
  ...BUTTON_DEFAULTS,
});

const Trigger = Dialog.Trigger;

type AlertProps = {
  title: string;
  description: string;
  action: () => void;
  actionTitle: string;
  triggerButton: () => JSX.Element;
};

const Alert = ({
  title,
  description,
  action,
  actionTitle,
  triggerButton,
}: AlertProps) => {
  const button = triggerButton();
  return (
    <Root>
      <Trigger asChild>{button}</Trigger>
      <Portal>
        <Overlay />
        <Content>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <ActionGroup>
            <Cancel>Cancel</Cancel>
            <Action onClick={action}>{actionTitle}</Action>
          </ActionGroup>
        </Content>
      </Portal>
    </Root>
  );
};

export default Alert;
