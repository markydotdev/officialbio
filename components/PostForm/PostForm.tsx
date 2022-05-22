import { useEffect, useState } from 'react';

import * as Label from '@radix-ui/react-label';

import Tabs from './Tabs';
import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import LinkForm from './LinkForm';
import TextForm from './TextForm';
import DescriptionForm from './DescriptionForm';

const FormBox = styled('div', {
  backgroundColor: '$gray1',
  padding: '1rem',
  borderRadius: '$image',
  boxShadow: '$low',
});
const StyledForm = styled('form', {
  position: 'relative',
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
export const BaseInput = styled('input', {
  borderRadius: '$image',
  height: '3rem',
  margin: '0.25rem 0 0 0',
  padding: '0.5em',
  border: '0',
  backgroundColor: '$gray4',
  fontSize: '$base',
  '@supports (width: -moz-available)': {
    width: '-moz-available',
  },
  '@supports (width: -webkit-fill-available)': {
    width: '-webkit-fill-available',
  },
});
export const StyledLabel = styled(Label.Root, {
  fontSize: '$base',
  fontWeight: 500,
  userSelect: 'none',
});
const HiddenButton = styled('button', {
  display: 'none',
});

function PostForm({
  onSubmit,
  inputText,
  setInputText,
  setUploads,
  setLinkText,
  setLinkUrl,
  activeTab,
  setActiveTab,
  refreshLinks,
}) {
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
    <>
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <FormBox>
        <StyledForm onSubmit={(e) => handleSubmit(e)} method='POST'>
          {activeTab === strings.tabs.links && (
            <LinkForm
              setLinkText={setLinkText}
              setLinkUrl={setLinkUrl}
              refreshLinks={refreshLinks}
            />
          )}

          {activeTab === strings.tabs.messages && (
            <TextForm
              handleFiles={handleFiles}
              inputText={inputText}
              setInputText={setInputText}
            />
          )}

          {activeTab === strings.tabs.profile && <DescriptionForm />}
          {/* Prevent implicit submission of the form with enter key*/}
          <HiddenButton type='submit' disabled aria-hidden='true' />
        </StyledForm>
        {activeTab === strings.tabs.messages && preview && (
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
