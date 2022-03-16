import { useState } from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/Button';
import { styled } from '../stitches.config';
import strings from '../locales/en/strings';
import { supabase } from '../lib/supabaseClient';
import { useRouter } from 'next/router';

const SetupTitle = styled('h2', {});
const Subsection = styled('section', {
  display: 'flex',
  paddingBottom: '1rem',
});
const SubsectionTitle = styled('h3', {
  flex: 1,
});
const Form = styled('form', {
  borderRadius: '$button',
  backgroundColor: '$gray1',
  padding: '1rem',
  boxShadow: '$low',
});
const HiddenInput = styled('input', {
  color: 'transparent',
  opacity: 0,
  pointerEvents: 'auto',
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  left: 0,
});
const UploadButton = styled('button', {
  flex: 2,
  position: 'relative',
  pointerEvents: 'none',
  margin: 0,
  padding: '0.5rem',
  border: 'none',
  borderRadius: '$button',
  transition: 'all ease-in-out 0.1s',
  '&:hover': {
    filter: 'brightness(0.9)',
  },
  '&:active': {
    transform: 'scale(0.99)',
    filter: 'brightness(0.8)',
  },
});
const InputBox = styled('input', {
  flex: 2,
  margin: 0,
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
const SubmitSection = styled('section', {
  display: 'flex',
  justifyContent: 'center',
});
const ImagePreview = styled('img', {
  width: '100px',
  height: '100px',
  objectFit: 'cover',
  borderRadius: '999px',
  margin: '0rem 1rem',
});

const SetupForm = () => {
  const user = supabase.auth.user();
  const router = useRouter();
  const [form, setForm] = useState({
    name: undefined,
    image: undefined,
  });
  const [preview, setPreview] = useState('');

  const handleImageChange = async (e) => {
    setForm({ ...form, image: e.target.files[0] });
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (form.image !== null) {
      console.log('only one image');
      const avatarImage = form.image;
      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(`${user.id}/avatar1.jpg`, avatarImage, {
          cacheControl: '3600',
        });
      console.log(data || error);
      if (data) {
        const { data, error } = await supabase
          .from('profiles')
          .update({ avatar_url: `${user.id}/avatar1.jpg`, pubName: form.name })
          .eq('id', user.id);
        console.log(data || error);
        if (data) {
          router.push('/musings');
        }
      }
    }
  };

  return (
    <Form onSubmit={(e) => submitForm(e)}>
      <Subsection>
        <SubsectionTitle>1. {strings.account.name}</SubsectionTitle>
        <InputBox
          type='text'
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required={true}
          aria-label={strings.account.nameAria}
        />
      </Subsection>
      <Subsection>
        <SubsectionTitle>2. {strings.account.avatarUpload}</SubsectionTitle>
        {preview.length > 1 && <ImagePreview src={preview} />}
        <UploadButton type='button'>
          {preview.length > 1
            ? `Replace your profile picture`
            : `Upload a profile image (you can change this later)`}
          <HiddenInput
            type='file'
            value={undefined}
            onChange={(e) => handleImageChange(e)}
            required={true}
            aria-label={strings.account.avatarUpload}
            accept='image/*'
          />
        </UploadButton>
      </Subsection>

      <SubmitSection>
        <Button
          type='submit'
          onClick={(e) => submitForm(e)}
          disabled={false}
          version={undefined}
          loading={false}
        >
          Save
        </Button>
      </SubmitSection>
    </Form>
  );
};

const SetupPage = () => {
  return (
    <Layout>
      <SetupTitle>Initial Setup</SetupTitle>
      <SetupForm />
    </Layout>
  );
};

export default SetupPage;
