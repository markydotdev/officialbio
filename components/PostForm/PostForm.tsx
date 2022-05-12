import { useState } from 'react';

import * as Label from '@radix-ui/react-label';

import Tabs from './Tabs';
import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';

const FormBox = styled('div', {
  backgroundColor: '$gray1',
  padding: '1rem 0.75rem 0.5rem 0.75rem',
  borderRadius: '0 0 $image $image',
});
const StyledForm = styled('form', {
  position: 'relative',
});
const StyledInputSection = styled('div', {
  flex: '1',
});
const SharedInputMargin = '0.25rem 0 0 0';
const BaseInput = styled('input', {
  borderRadius: '$image',
  width: '-webkit-fill-available',
  height: '3rem',
  margin: SharedInputMargin,
  padding: '0.5em',
  border: '0',
  backgroundColor: '$gray5',
  fontSize: '$base',
});
const StyledInput = styled('textarea', {
  boxShadow: `rgba(0, 0, 0, 0.06) 0px 2px 4px 0px inset`,
  width: '-webkit-fill-available',
  height: '4em',
  margin: SharedInputMargin,
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
const StyledLabel = styled(Label.Root, {
  fontSize: '$base',
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
const InputSeparator = styled('span', {
  display: 'block',
  height: '1rem',
});

function LinkForm({ linkText, linkUrl, setLinkText, setLinkUrl }) {
  const [link, setLink] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLinkText(link);
    setLinkUrl(text);
    console.log(link, text);
  };
  return (
    <div>
      <StyledLabel htmlFor='link' as='label'>
        Step One: Enter your link
      </StyledLabel>
      <BaseInput
        id='link'
        type='url'
        placeholder='https://google.com'
        required
        onChange={(e) => setLink(e.target.value)}
      />
      <InputSeparator />
      <StyledLabel htmlFor='link-text' as='label'>
        Step Two: Label your link
      </StyledLabel>
      <BaseInput
        id='link-text'
        type='text'
        placeholder='Visit google!'
        required
        onChange={(e) => setText(e.target.value)}
      />
      <button type='submit' onClick={(e) => handleSubmit(e)}>
        Submit
      </button>
    </div>
  );
}

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

function PostForm({
  onSubmit,
  inputText,
  setInputText,
  setUploads,
  linkText,
  linkUrl,
  setLinkText,
  setLinkUrl,
}) {
  const [preview, setPreview] = useState(null);
  const [activeTab, setActiveTab] = useState('text');

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
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FormBox>
        <StyledForm onSubmit={(e) => handleSubmit(e)} method='POST'>
          {activeTab === 'link' && (
            <LinkForm
              linkText={linkText}
              linkUrl={linkUrl}
              setLinkText={setLinkText}
              setLinkUrl={setLinkUrl}
            />
          )}

          {activeTab === 'text' && (
            <TextForm
              handleFiles={handleFiles}
              inputText={inputText}
              setInputText={setInputText}
            />
          )}
          {/* Prevent implicit submission of the form with enter key*/}
          <button
            type='submit'
            disabled
            style={{ display: 'none' }}
            aria-hidden='true'
          ></button>
        </StyledForm>
        {activeTab === 'text' && preview && (
          <PreviewBox>
            {preview.map((image) => (
              <ImageContainer key={image} className='container'>
                <UploadPreview src={image} />
              </ImageContainer>
            ))}
          </PreviewBox>
        )}
      </FormBox>
    </>
  );
}

export default PostForm;
