import { Footer, Nav } from '@ob/shared';
import Head from 'next/head';
import styles from './base.module.css';

const links = [
  { id: 0, url: '/test-one', text: 'Test One' },
  { id: 1, url: '/test-two', text: 'Test Two' },
];

export default function Base({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>Hi from Officialbio</title>
      </Head>

      <main className={styles.main}>
        <Nav links={links} />
        {children}
        <Footer />
      </main>
    </>
  );
}
