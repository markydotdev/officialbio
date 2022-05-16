import * as TooltipBase from '@radix-ui/react-tooltip';

import { styled } from '../../stitches.config';

const ToolTipMessage = styled(TooltipBase.Content, {
  backgroundColor: '$gray6',
  padding: '0.5rem 1rem',
  borderRadius: '$button',
  boxShadow: '$tooltip',
});
const TooltipArrow = styled(TooltipBase.Arrow, {
  fill: '$gray6',
});

function Tooltip({ message, children, side }) {
  return (
    <TooltipBase.Provider delayDuration={200}>
      <TooltipBase.Root>
        <TooltipBase.Trigger asChild>{children}</TooltipBase.Trigger>
        <ToolTipMessage
          align={'end'}
          sideOffset={5}
          side={side ? 'right' : 'bottom'}
        >
          <TooltipArrow offset={5} width={12} height={5} />
          {message}
        </ToolTipMessage>
      </TooltipBase.Root>
    </TooltipBase.Provider>
  );
}

export default Tooltip;
