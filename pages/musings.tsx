import { useEffect, useState } from 'react';

import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import Message from '../components/Message';
import PostForm from '../components/PostForm';
import {
  deleteMusing,
  fetchMusings,
  postMusing,
  postMusingImage,
  publishMusing,
  removePublicMusing,
} from '../utils/post';
import { supabase } from '../utils/supabaseClient';

export default function Musings({ user, guest }) {
  const [posts, setPosts] = useState(null);
  const [inputText, setInputText] = useState('');
  const [uploads, setUploads] = useState(null);
  const [linkText, setLinkText] = useState('');
  const [linkUrl, setLinkUrl] = useState('');

  useEffect(() => {
    if (inputText.length === 0) {
      initialize();
    }
  }, [inputText.length]);

  async function initialize() {
    const data = await fetchMusings();
    setPosts(data);
    setUploads(null);
  }

  async function removePost(id) {
    await deleteMusing(id);
    setPosts(posts.filter((x) => x.id !== id));
  }

  async function publishPost(id) {
    await publishMusing(id);
    initialize();
  }

  async function privatePost(id) {
    await removePublicMusing(id);
    initialize();
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (
      inputText.length > 3 &&
      inputText.length <= 512 &&
      uploads &&
      uploads.length <= 3
    ) {
      try {
        await postMusingImage(inputText.trim(), uploads, user.id);
        setInputText('');
      } catch (error) {
        console.log(error);
        if (error.statusCode === 429) {
          alert(error.message);
        }
      }
    } else if (
      !uploads &&
      inputText &&
      inputText.length > 3 &&
      inputText.length <= 512
    ) {
      try {
        await postMusing(inputText.trim(), user.id);
        setInputText('');
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (guest) {
    return (
      <Layout>
        <AuthForm />
      </Layout>
    );
  }

  return (
    <Layout>
      <PostForm
        onSubmit={onSubmit}
        inputText={inputText}
        setInputText={setInputText}
        setUploads={setUploads}
        linkText={linkText}
        setLinkText={setLinkText}
        linkUrl={linkUrl}
        setLinkUrl={setLinkUrl}
      />

      {posts && (
        <Message
          removePost={removePost}
          publishPost={publishPost}
          privatePost={privatePost}
          posts={posts}
        />
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { user, error } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    // If no user, redirect to index.
    return { props: { guest: true } };
  }

  return { props: { user } };
}
