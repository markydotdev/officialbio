import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';

const MockUploadButton = styled('label', {
  cursor: 'pointer',
  border: '1px solid transparent',
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
    border: '1px solid $gray12',
  },
});

type UploadProps = {
  first?: boolean;
  loading?: boolean;
  onUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function UploadButton({ first, loading, onUpload }: UploadProps) {
  if (first) {
    return (
      <>
        <MockUploadButton htmlFor='single'>
          {loading
            ? strings.account.avatarInProgress
            : strings.account.avatarUpload}
        </MockUploadButton>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={onUpload}
          disabled={loading}
        />
      </>
    );
  }
  return (
    <>
      <MockUploadButton htmlFor='single'>
        {loading
          ? strings.account.avatarInProgress
          : strings.account.avatarReplace}
      </MockUploadButton>
      <input
        style={{
          visibility: 'hidden',
          position: 'absolute',
        }}
        type='file'
        id='single'
        accept='image/*'
        onChange={onUpload}
        disabled={loading}
      />
    </>
  );
}

export default UploadButton;
