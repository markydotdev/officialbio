import { supabase } from '../../utils/supabaseClient';
import { DEFAULT_AVATARS_BUCKET } from '../../utils/constants';

export async function uploadAvatar(event, setAvatar) {
  try {
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

    return true;
  } catch (error) {
    console.log('Trycatch error: ', error.message);
    return false;
  }
}

export async function addLinkToProfile(link, text) {
  try {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('profiles')
      .select('linkContent')
      .eq('id', user.id);
    if (data) {
      const previousData = data[0].linkContent;
      const newData = {
        id: previousData.length + 1,
        name: 'General link',
        text: link,
        type: 'link',
        display: text,
      };
      previousData.push(newData);
      const { data: da, error: err } = await supabase
        .from('profiles')
        .update({ linkContent: previousData }, { returning: 'minimal' })
        .eq('id', user.id);
      if (err) {
        throw 'Error updating database';
      }
    }
  } catch (error) {
    console.log(error);
  }
}
