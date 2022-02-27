import { useState } from 'react';
import { BaseLayout } from '../components/BaseLayout';
import { styled } from '../stitches.config';
import strings from '../locales/en/strings';

const SubsectionTitle = styled('h2', {
  margin: '2rem 0 0 0',
  '&:first-of-type': {
    marginTop: '1rem',
  },
  '@media (min-width: 800px)': {
    margin: '2rem 0 0 1rem',
  },
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
  width: '10rem',
  height: '4rem',
  position: 'absolute',
  top: 0,
  left: 0,
});
const UploadButton = styled('button', {
  position: 'relative',
  pointerEvents: 'none',
  width: '10rem',
  height: '4rem',
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

const SetupForm = () => {
  const [form, setForm] = useState({
    name: undefined,
    image: undefined,
  });

  const submitForm = async () => {
    // handle uploading the image
    // handle setting the name in db with the avatar link in the storage
    console.log(form);
  };

  return (
    <Form onSubmit={() => submitForm()}>
      <SubsectionTitle>{strings.account.name}</SubsectionTitle>
      <InputBox
        type='text'
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required={true}
        aria-label={strings.account.nameAria}
      />

      <SubsectionTitle>{strings.account.avatarUpload}</SubsectionTitle>
      <UploadButton type='button'>
        Add profile image
        <HiddenInput
          type='file'
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          required={true}
          aria-label={strings.account.avatarUpload}
        />
      </UploadButton>

      <button type='submit'>Save</button>
    </Form>
  );
};

const SetupPage = () => {
  return (
    <BaseLayout>
      <SetupForm />
    </BaseLayout>
  );
};

export default SetupPage;
