import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';
import { addSocialToDb } from '../../utils/addSocial';
import { DEFAULT_AVATARS_BUCKET } from '../../utils/constants';
import { supabase } from '../../utils/supabaseClient';
import Avatar from '../Avatar';
import Button from '../Button';
import Placeholder from '../Placeholder';
import InputGroup from './InputGroup';
import Subsection from './Subsection';
import UploadButton from './UploadButton';

const AccountBox = styled('div', {});
const AvatarField = styled('div', {
  display: 'flex',
  alignItems: 'center',
  height: '150px',
});
const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
});
const EmailLabel = styled('label', {
  width: '8em',
  fontSize: 'small',
});
const EmailBox = styled('input', {
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
const StaticEmailBox = styled('div', {
  cursor: 'not-allowed',
  display: 'flex',
  alignItems: 'center',
});
const ButtonGroup = styled('div', {
  display: 'flex',
  justifyContent: 'center',
});
const SignOutSection = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  margin: '5vh 1rem 1rem 1rem',
});

function AccountSettings({ session }) {
  const router = useRouter();
  const user = supabase.auth.user();
  const [loading, setLoading] = useState(true);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [pubName, setPubName] = useState(null);
  const [website, setWebsite] = useState(null);
  const [description, setDescription] = useState(null);

  useEffect(() => {
    getProfile();

    const provider = 'discord';
    const enabled = true;
    const userId = user.id;
    const name = 'Ok so now does this work??';

    const magic = async () => {
      await addSocialToDb(provider, enabled, name, userId);
    };
    magic();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) console.log('Error logging out:', error.message);
    router.push('/sign_in');
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length == 0) {
        throw 'You must select an image to upload.';
      }
      const user = supabase.auth.user();
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data: da, error: er } = await supabase.storage
        .from(DEFAULT_AVATARS_BUCKET)
        .list(user.id, {
          limit: 3,
          offset: 0,
        });

      if (da.find((x) => x.name === filePath)) {
        console.log('File already exists, skipping upfront upload');
        const { data, error } = await supabase.storage
          .from(DEFAULT_AVATARS_BUCKET)
          .remove([`${user.id}/${filePath}`]);
        if (error) console.log('Problem removing image', error);

        const { data: d, error: e } = await supabase.storage
          .from(DEFAULT_AVATARS_BUCKET)
          .upload(`${user.id}/${filePath}`, file);
        if (e) console.log('Problem uploading image', e);
      } else {
        const { data, error } = await supabase.storage
          .from(DEFAULT_AVATARS_BUCKET)
          .upload(`${user.id}/${filePath}`, file);
      }

      let { data, error: updateError } = await supabase.from('profiles').upsert(
        {
          id: user.id,
          avatar_url: `${user.id}/${filePath}`,
        },
        { returning: 'minimal' }
      );

      if (updateError) {
        console.log('Update error happened', updateError);
      }

      setAvatar(filePath);
    } catch (error) {
      console.log('Trycatch error: ', error.message);
    } finally {
      setTimeout(() => {
        setUploading(false);
        router.reload();
      }, 4000);
    }
  }

  function setProfile(profile) {
    setAvatar(profile.avatar_url);
    setPubName(profile.pubName);
    setWebsite(profile.website);
    setDescription(profile.description);
  }

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const { data, error } = await supabase
        .from('profiles')
        .select(`pubName, website, description, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error) {
        throw error;
      }

      setProfile(data);
    } catch (error) {
      console.log('error', error.message);
    } finally {
      setLoading(false);
      setContentLoaded(true);
    }
  }

  async function updateProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        pubName,
        website,
        description,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
      setContentLoaded(true);
    }
  }

  if (session === null) {
    return (
      <AccountBox>
        <h2 style={{ textAlign: 'center' }}>
          Please fill out your account info
        </h2>

        <Subsection title={strings.account.avatar} description={null}>
          {contentLoaded ? (
            <AvatarField>
              <Avatar
                url={avatar}
                size={120}
                type='square'
                initials={
                  pubName
                    ? pubName.charAt(0)
                    : `${user.email.charAt(0)}${user.email.charAt(1)}`
                }
              />
              <UploadButton
                onUpload={uploadAvatar}
                loading={uploading}
                first={true}
              />
            </AvatarField>
          ) : (
            <Placeholder height='150px' width='120px' margin={undefined} />
          )}
        </Subsection>

        <Subsection title={strings.account.linksAlt} description={null}>
          {contentLoaded ? (
            <InputGroup
              type='pub-name'
              label='Public Name'
              value={pubName || ''}
              onChange={(e) => setPubName(e.target.value)}
            />
          ) : (
            <Placeholder
              height='2rem'
              margin='0 0 0.5rem 0'
              width={undefined}
            />
          )}
        </Subsection>

        <SignOutSection>
          {contentLoaded ? (
            <ButtonGroup>
              {contentLoaded ? (
                <Button
                  onClick={() => updateProfile()}
                  version='reverse'
                  loading={loading}
                  type={undefined}
                  disabled={undefined}
                >
                  {loading ? strings.account.loading : strings.account.save}
                </Button>
              ) : (
                <Placeholder height='2.5rem' width='10rem' margin={undefined} />
              )}
            </ButtonGroup>
          ) : (
            <Placeholder height='2.5rem' width='10rem' margin={undefined} />
          )}
        </SignOutSection>
      </AccountBox>
    );
  }

  return (
    <AccountBox>
      <Subsection
        title={strings.account.avatar}
        description={strings.account.avatarDesc}
      >
        {contentLoaded ? (
          <AvatarField>
            {avatar && (
              <Avatar
                url={avatar}
                size={120}
                type='square'
                initials={pubName && pubName.charAt(0)}
              />
            )}
            <UploadButton
              onUpload={uploadAvatar}
              loading={uploading}
              first={false}
            />
          </AvatarField>
        ) : (
          <Placeholder height='150px' width='120px' margin={undefined} />
        )}
      </Subsection>

      <Subsection
        title={strings.account.info}
        description={strings.account.infoDesc}
      >
        <FormGroup>
          {contentLoaded ? (
            <StaticEmailBox>
              <EmailLabel htmlFor='email'>Email</EmailLabel>
              <EmailBox
                id='email'
                type='text'
                value={session.email}
                disabled
                readOnly
                tabIndex={-1}
              />
            </StaticEmailBox>
          ) : (
            <Placeholder height='2rem' margin='0' width={undefined} />
          )}
        </FormGroup>
      </Subsection>

      <Subsection
        title={strings.account.links}
        description={strings.account.linksDesc}
      >
        {contentLoaded ? (
          <InputGroup
            type='pub-name'
            label='Public Name'
            value={pubName || ''}
            onChange={(e) => setPubName(e.target.value)}
          />
        ) : (
          <Placeholder height='2rem' margin='0 0 0.5rem 0' width={undefined} />
        )}
        {contentLoaded ? (
          <InputGroup
            type='description'
            label='Bio'
            value={description || ''}
            onChange={(e) => setDescription(e.target.value)}
          />
        ) : (
          <Placeholder height='2rem' margin='0 0 0.5rem 0' width={undefined} />
        )}
        {contentLoaded ? (
          <InputGroup
            type='website'
            label='Website'
            value={website || ''}
            onChange={(e) => setWebsite(e.target.value)}
          />
        ) : (
          <Placeholder height='2rem' margin='0 0 0.5rem 0' width={undefined} />
        )}

        <ButtonGroup>
          {contentLoaded ? (
            <Button
              onClick={() => updateProfile()}
              version='reverse'
              loading={loading}
              type={undefined}
              disabled={undefined}
            >
              {loading ? strings.account.loading : strings.account.save}
            </Button>
          ) : (
            <Placeholder height='2.5rem' width='10rem' margin={undefined} />
          )}
        </ButtonGroup>
      </Subsection>

      <SignOutSection>
        {contentLoaded ? (
          <Button
            onClick={() => signOut()}
            type={undefined}
            disabled={undefined}
            version={undefined}
            loading={undefined}
          >
            {strings.account.signOut}
          </Button>
        ) : (
          <Placeholder height='2.5rem' width='10rem' margin={undefined} />
        )}
      </SignOutSection>
    </AccountBox>
  );
}

export default AccountSettings;
