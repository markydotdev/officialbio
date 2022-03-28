import * as LabelBase from '@radix-ui/react-label';
import * as Switch from '@radix-ui/react-switch';

import { styled } from '../../stitches.config';

const StyledInput = styled('input', {
  minWidth: '70vw',
});
const SwitchRoot = styled(Switch.Root, {
  all: 'unset',
  width: 42,
  height: 25,
  backgroundColor: '$gray12',
  borderRadius: '9999px',
  position: 'relative',
});
const SwitchCircle = styled(Switch.Thumb, {
  display: 'block',
  width: 21,
  height: 21,
  backgroundColor: 'white',
  borderRadius: '9999px',
  transition: 'transform 100ms',
  transform: 'translateX(2px)',
  willChange: 'transform',
  '&[data-state="checked"]': { transform: 'translateX(19px)' },
});
const StyledLabel = styled(LabelBase.Root, {
  userSelect: 'none',
});
const ProviderTitle = styled('h3', {
  textTransform: 'capitalize',
  margin: 0,
});
const InputGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
});

function Label({ label, linkedInput }) {
  return <StyledLabel htmlFor={linkedInput}>{label}</StyledLabel>;
}
function SwitchToggle({ id }) {
  return (
    <SwitchRoot id={id}>
      <SwitchCircle />
    </SwitchRoot>
  );
}

function SocialBox({ provider }) {
  return (
    <section>
      <ProviderTitle>{provider}</ProviderTitle>
      <InputGroup>
        <Label label={'name'} linkedInput='name' />
        <StyledInput id='name' />
      </InputGroup>
      <InputGroup>
        <Label linkedInput={provider} label='Show this on public?' />
        <SwitchToggle id={provider} />
      </InputGroup>
    </section>
  );
}

export default SocialBox;
