import Link from 'next/link';

type Nav = {
  id: number;
  url: string;
  text: string;
};

interface NavProps {
  links: Nav[];
}

export default function Nav(props: NavProps) {
  return (
    <nav>
      {props.links.map((link) => (
        <Link href={link.url} key={link.id}>
          {link.text}
        </Link>
      ))}
    </nav>
  );
}
