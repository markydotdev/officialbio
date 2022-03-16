import { useState } from 'react';

import * as Label from '@radix-ui/react-label';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';

const FormBox = styled('div', {
  backgroundColor: '$gray1',
  boxShadow: '$low',
  padding: '1rem',
  borderRadius: '$button',
});
const StyledForm = styled('form', {
  position: 'relative',
});
const StyledInputSection = styled('div', {
  flex: '1',
});
const StyledInput = styled('textarea', {
  width: '-webkit-fill-available',
  height: '4em',
  margin: '0.5rem 0 0 0',
  padding: '0.5em',
  border: '0',
  backgroundColor: '$gray5',
  resize: 'none',
  fontSize: '1rem',
  fontFamily: 'system-ui',
  borderRadius: '$button',
  '@supports (width: -moz-available)': {
    width: '-moz-available',
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
    fontSize: '1.2em',
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
const StyledLabel = styled(Label.Root, {
  fontSize: 15,
  fontWeight: 500,
  userSelect: 'none',
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
const PreviewBox = styled('div', {
  display: 'flex',
  marginTop: '0.5rem',
});
const ImageContainer = styled('div', {
  flex: 1,
  display: 'inline-flex',
  justifyContent: 'center',
  '& + .container': {
    marginLeft: '1rem',
  },
});
const UploadPreview = styled('img', {
  height: '10rem',
  width: '100%',
  objectFit: 'cover',
  borderRadius: '$button',
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

function PostForm({ onSubmit, inputText, setInputText, setUploads }) {
  const [preview, setPreview] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(e);
    const el = e.target.children[0].children[1];
    el.value = '';
    setPreview(null);
  }

  async function handleFiles(e) {
    const fileList = [...e.target.files];

    // Add in a test for number of files
    if (fileList.length > 3) {
      alert(strings.musings.maxFiles);
      return;
    }

    setUploads(fileList);
    setPreview(fileList.map((file) => URL.createObjectURL(file)));
  }

  return (
    <FormBox>
      <StyledForm onSubmit={(e) => handleSubmit(e)} method='POST'>
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

        {/* Prevent implicit submission of the form with enter key*/}
        <button
          type='submit'
          disabled
          style={{ display: 'none' }}
          aria-hidden='true'
        ></button>
      </StyledForm>
      {preview && (
        <PreviewBox>
          {preview.map((image) => (
            <ImageContainer key={image} className='container'>
              <UploadPreview src={image} />
            </ImageContainer>
          ))}
        </PreviewBox>
      )}
    </FormBox>
  );
}

export default PostForm;
