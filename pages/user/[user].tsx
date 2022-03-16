import { BaseLayout } from '../../components/BaseLayout';
import { supabase } from '../../lib/supabaseClient';
import { PublicArticle } from '../../components/PublicArticle';
import Link from 'next/link';
import ContactCard from '../../components/ContactCard';
import strings from '../../locales/en/strings';
import { styled } from '../../stitches.config';

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

function UserPage({ user, avatar, postData }) {
  if (postData) {
    return (
      <BaseLayout>
        <ContactCard name={user} avatar={avatar} />

        {postData
          .sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at))
          .map((post) => (
            <PublicArticle key={post.id} post={post} makePrivate={undefined} />
          ))}
      </BaseLayout>
    );
  }
  return (
    <BaseLayout>
      <h1>{strings.public.missingUser}</h1>
      <Link href='/' passHref>
        <ReturnHome>{strings.public.returnHome}</ReturnHome>
      </Link>
    </BaseLayout>
  );
}

export default UserPage;

export async function getServerSideProps(context) {
  const userName = context.query.user;
  // Why am I even looking at the cookie? Because it's a public page so even logged out users should be able to see it...
  // const all = await supabase.auth.api.getUserByCookie(context.req);
  // console.log(all);

  const { data, error } = await supabase
    .from('profiles')
    .select('id, avatar_url, external_connections')
    .eq('pubName', userName);

  // We need to get only the external_connections from data[0] that have enabled set to true
  if (data[0] !== undefined) {
    const externalConnections = data[0].external_connections.filter(
      (account) => account.enabled
    );
    const connectionName = externalConnections.map((account) => account.id);
  }

  // // we need to loop through user.identities and filter the connection that matches the connectionName
  // const connection = user.identities.filter((provider) =>
  //   connectionName.includes(provider.provider)
  // );
  // // connection works great, one specific issue:
  // // gotrue hasn't been updated in supabase-js yet, so name just shows the name WITHOUT the identifier tag (name#1234)
  // // but when it's updated it will show the name with the identifier tag (name#1234)
  // // so for now just deal with it showing (name)
  // // FOR REFERNECE: https://github.com/supabase/gotrue/releases/tag/v2.5.6
  // console.log(connection);

  if (data[0]) {
    const { id, avatar_url } = data[0];
    const { data: postData, error: errorObj } = await supabase
      .from('posts')
      .select()
      .eq('public', true)
      .match({ user_id: id });
    if (postData) {
      // fetch also the linked accounts here
      return {
        props: { user: userName, avatar: avatar_url, postData },
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
