import { styled } from '../../stitches.config';
import strings from '../../locales/en/strings';
import { StyledLabel } from './PostForm';

const StyledInputSection = styled('div', {
  flex: '1',
});
const StyledInput = styled('textarea', {
  boxShadow: `rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset`,
  height: '4em',
  margin: '0.25rem 0 0 0',
  padding: '0.5em',
  border: '0',
  backgroundColor: '$gray5',
  resize: 'none',
  fontSize: '$base',
  fontFamily: 'system-ui',
  borderRadius: '$image',
  '@supports (width: -moz-available)': {
    width: '-moz-available',
  },
  '@supports (width: -webkit-fill-available)': {
    width: '-webkit-fill-available',
  },
});
const AddImagesButton = styled('input', {
  color: 'transparent',
  minWidth: '150px',
  '&::-webkit-file-upload-button': {
    visibility: 'hidden',
  },
  '&::before': {
    content: strings.musings.addImages,
    display: 'inline-block',
    outline: 'none',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    border: '2px solid transparent',
    backgroundColor: '$gray12',
    color: '$gray1',
    borderRadius: '$button',
    fontSize: '$base',
    minWidth: '$button',
    padding: '0.5rem 1rem 0.5rem 1.15rem',
  },
  '&:hover': {
    '&::before': {
      color: '$gray12',
      backgroundColor: 'transparent',
      border: '2px solid $gray12',
    },
  },
});
const ButtonGroup = styled('div', {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '0.5rem',
});
const PostButton = styled('button', {
  cursor: 'pointer',
  height: '100%',
  color: '$gray1',
  backgroundColor: '$gray12',
  alignSelf: 'center',
  outline: 'none',
  border: 'none',
  borderRadius: '$button',
  padding: '1rem',
  fontWeight: 'bold',
  '&:disabled': {
    visibility: 'hidden',
    filter: 'opacity(0.4)',
  },
});
const CharacterCount = styled('span', {
  position: 'absolute',
  right: '0',
  variants: {
    overlimit: {
      true: {
        color: 'red',
      },
    },
  },
});

function TextForm({ setInputText, inputText, handleFiles }) {
  return (
    <StyledInputSection>
      <StyledLabel htmlFor='post-submission' as='label'>
        {strings.musings.create}
        <StyledInput
          id='post-submission'
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
        />
      </StyledLabel>
      <ButtonGroup>
        <AddImagesButton
          type='file'
          id='input'
          accept='image/*'
          multiple
          onChange={(e) => handleFiles(e)}
        ></AddImagesButton>
        <PostButton
          type='submit'
          disabled={inputText.length <= 3 || inputText.length > 512}
        >
          {strings.musings.submit}
        </PostButton>
        {inputText.length > 400 && (
          <CharacterCount overlimit={inputText.length > 512}>
            {inputText.length + '/512'}
          </CharacterCount>
        )}
      </ButtonGroup>
    </StyledInputSection>
  );
}

export default TextForm;
