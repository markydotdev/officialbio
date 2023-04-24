import Head from 'next/head';

export default function Base({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Head>
        <title>Hi from Officialbio</title>
      </Head>

      {children}
    </>
  );
}
