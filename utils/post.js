import { supabase } from './supabaseClient';
import CryptoJS from 'crypto-js';

export async function fetchMusings() {
  // Fetch all posts
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('id', true);
    if (error) throw new Error();
    return data;
  } catch (error) {
    console.log(error.message);
  }
}

export async function postMusing(input, user) {
  try {
    const { data, error } = await supabase
      .from('posts')
      .insert(
        { post: input, user_id: user, files: null },
        { returning: 'minimal' }
      );
  } catch (error) {
    console.log(error);
  }
}

export async function postMusingImage(input, images, user) {
  if (images.length > 3) {
    function LimitError(message) {
      this.message = message;
      this.statusCode = 429;
      this.name = 'FileLimit';
    }
    throw new LimitError('too many images');
  }
  // Adds a new post

  // Wrapping the reader in a promise
  function readAsync(file) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      reader.readAsBinaryString(file);
    });
  }

  function getExtension(image) {
    const pre = image.type.split('/');
    const extension = pre[pre.length - 1];
    return extension;
  }

  const hashList = images.map(async (image) => {
    const res = await readAsync(image);
    const md5 = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(res)).toString();
    const ext = getExtension(image);
    const filename = `${md5}.${ext}`;
    return filename;
  });

  const res = await Promise.all(hashList);

  try {
    images.forEach(async (image, index) => {
      const { data, error } = await supabase.storage
        .from('public-uploads')
        .upload(res[index], image, { cacheControl: '3600', upsert: false });
    });
  } catch (error) {
    console.log(error);
  }

  try {
    const files = res.map((image) => `public-uploads/${image}`);
    const { data, error } = await supabase
      .from('posts')
      .insert(
        { post: input, user_id: user, files: files },
        { returning: 'minimal' }
      );
  } catch (error) {
    console.log(error);
  }
}

export async function editMusing(id) {
  // Edit post
  // Potentially remove images?
}

export async function deleteMusing(id) {
  // Remove post
  // Remove submissions if they aren't used elsewhere?
  try {
    await supabase.from('posts').delete().eq('id', id);
  } catch (error) {
    console.log(error);
  }
}

export async function publishMusing(id) {
  // Move post to public for all to see
  try {
    const { data, error } = await supabase.from('posts').select().eq('id', id);
    const { data: da, error: err } = await supabase
      .from('posts')
      .update({ public: true })
      .match({ id: id });
    return da;
  } catch (error) {
    console.log(error || err);
  }
}

export async function removePublicMusing(id) {
  // Remove post from public
  try {
    const { data: da, error: err } = await supabase
      .from('posts')
      .update({ public: false })
      .match({ id: id });
  } catch (error) {
    console.log(error);
  }
}
