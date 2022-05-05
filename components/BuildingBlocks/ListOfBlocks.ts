import strings from '../../locales/en/strings';

/* Requires the following:
 * id: number, this is the identifying aspect of the block
 * name: string, this is the label for the block
 * type: string, this is the type of block it is
 */

type Block = {
  id: string;
  name: string;
  type: string;
};

const Blocks: Block[] = [
  { id: '0', name: strings.create.displayLabelForLink, type: 'link' },
  { id: '1', name: strings.create.displayLabelForLink, type: 'link' },
  { id: '2', name: 'Generic Link', type: 'link' },
  { id: '3', name: 'Generic Link', type: 'link' },
  { id: '4', name: 'Generic Link', type: 'link' },
  { id: '5', name: 'Generic Link', type: 'link' },
  { id: '6', name: 'Generic Link', type: 'link' },
  { id: '7', name: 'Generic Link', type: 'link' },
];

export default Blocks;
