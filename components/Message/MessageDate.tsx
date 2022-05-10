import { styled } from '../../stitches.config';
import Tooltip from '../Tooltip';

const StyledDate = styled('span', {
  margin: '0.5rem 0 0.5rem 0',
  fontSize: '$sm',
  color: '$gray11',
  width: 'fit-content',
});

function MessageDate({ date }) {
  const stylizedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const formattedDate = new Date(date);
  const today = new Date();
  const difference = today.getTime() - formattedDate.getTime();
  const days = difference / (1000 * 3600 * 24);
  const daysString = days > 1 ? `${Math.trunc(days)} days ago` : stylizedDate;

  return (
    <Tooltip side={true} message={stylizedDate}>
      <StyledDate>{daysString}</StyledDate>
    </Tooltip>
  );
}

export default MessageDate;
