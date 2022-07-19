import Link from 'next/link';

import ContactCard from '../../../components/ContactCard';
import ContactExtras from '../../../components/ContactExtras';
import Layout from '../../../components/Layout';
import PublicMessage from '../../../components/PublicMessage';
import strings from '../../../locales/en/strings';
import { styled } from '../../../stitches.config';
import { supabase } from '../../../utils/supabaseClient';

const ReturnHome = styled('a', {
  backgroundColor: '$gray12',
  color: '$gray1',
  width: 'fit-content',
  padding: '$button',
  border: '2px solid transparent',
  borderRadius: '$button',
  '&:hover': {
    color: '$gray12',
    backgroundColor: 'transparent',
    border: '2px solid $gray12',
  },
});

function UserPage({ user, avatar, postData, links }) {
  if (postData) {
    return (
      <Layout>
        <ContactCard name={user} avatar={avatar} />

        <ContactExtras links={links} />

        {postData
          .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
          .map((post) => (
            <PublicMessage key={post.id} post={post} />
          ))}
      </Layout>
    );
  }
  return (
    <Layout>
      <h1>{strings.public.missingUser}</h1>
      <Link href='/' passHref>
        <ReturnHome>{strings.public.returnHome}</ReturnHome>
      </Link>
    </Layout>
  );
}

export default UserPage;

export async function getServerSideProps(context) {
  const userName = context.query.user;

  const { data, error } = await supabase
    .from('profiles')
    .select('id, avatar_url, linkContent')
    .eq('pubName', userName);

  if (data[0]) {
    const { id, avatar_url, linkContent } = data[0];
    const { data: postData, error: errorObj } = await supabase
      .from('posts')
      .select()
      .eq('public', true)
      .match({ user_id: id });
    if (postData) {
      return {
        props: {
          user: userName,
          avatar: avatar_url,
          postData,
          links: linkContent,
        },
      };
    } else {
      return {
        props: {},
      };
    }
  }
  return {
    props: {},
  };
}
