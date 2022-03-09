import { BaseLayout } from '../components/BaseLayout';
import { Feature } from '../components/Feature';
import { Hero } from '../components/Hero';
import strings from '../locales/en/strings';
import { supabase } from '../lib/supabaseClient';

export default function Home({ error }) {
  if (error) {
    return (
      <BaseLayout>
        <h1>{error.message}</h1>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <Hero
        title={strings.landing.title}
        subtitle={strings.landing.subtitle}
        prompt={strings.landing.prompt}
      />

      {strings.features.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </BaseLayout>
  );
}

export async function getServerSideProps({ req }) {
  return { props: {} };
}
