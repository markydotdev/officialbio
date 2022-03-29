import strings from '../../locales/en/strings';
import Feature from './Feature';
import Hero from './Hero';
import Start from './Start';

function Landing() {
  return (
    <>
      <Start>{strings.start}</Start>
      {/* <Hero
        title={strings.landing.title}
        subtitle={strings.landing.subtitle}
        prompt={strings.landing.prompt}
      /> */}

      {strings.features.map((feature) => (
        <Feature key={feature.id} {...feature} />
      ))}
    </>
  );
}

export default Landing;
