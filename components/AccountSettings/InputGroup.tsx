import { styled } from '../../stitches.config';

const InputField = styled('div', {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.5rem',
  minHeight: '2rem',
});
const InputLabel = styled('label', {
  width: '8em',
  fontSize: 'small',
});
const InputBox = styled('input', {
  margin: 0,
  width: '100%',
  border: 'none',
  padding: '0.5rem',
  backgroundColor: '$gray4',
  borderRadius: '0.25rem',
  variants: {
    disabled: {
      true: {
        padding: '0.5rem 0.5rem 0.5rem 0',
        backgroundColor: '$gray1',
        pointerEvents: 'none',
      },
    },
  },
});

type InputProps = {
  type: string;
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputGroup = ({ type, label, value, onChange }: InputProps) => {
  return (
    <InputField>
      <InputLabel htmlFor={type}>{label}</InputLabel>
      <InputBox id={type} type='text' value={value} onChange={onChange} />
    </InputField>
  );
};

export default InputGroup;
