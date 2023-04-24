import Image from 'next/image';

export default function Custom404() {
  return (
    <div>
      <h2>404 - Page cannot be found</h2>
      <Image src='/ghost.png' alt='cute 404 ghost' width={200} height={200} />
    </div>
  );
}
