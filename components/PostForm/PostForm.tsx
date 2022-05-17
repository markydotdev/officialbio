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
  padding: '1rem 0.75rem 0.5rem 0.75rem',
  borderRadius: '$image',
  boxShadow: '$lowMedium',
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
  width: '-webkit-fill-available',
  height: '3rem',
  margin: '0.25rem 0 0 0',
  padding: '0.5em',
  border: '0',
  backgroundColor: '$gray5',
  fontSize: '$base',
});
export const StyledLabel = styled(Label.Root, {
  fontSize: '$base',
  fontWeight: 500,
  userSelect: 'none',
});

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

  useEffect(() => {
    const tab = localStorage.getItem('active-tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, []);

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

          {activeTab === 'profile' && <DescriptionForm />}
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
