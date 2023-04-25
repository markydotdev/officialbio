interface Linkprops {
  url: string;
  text: string;
}

export default function CustomLink({ url, text }: Linkprops) {
  return <a href={url}>{text}</a>;
}
