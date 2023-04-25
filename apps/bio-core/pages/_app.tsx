import '@fontsource/lexend-deca';
import type { AppProps } from 'next/app';
import Base from '../layouts/base';
import '../styles/app.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Base>
      <Component {...pageProps} />
    </Base>
  );
}
