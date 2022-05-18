import { useEffect, useState } from 'react';
import ProfileLink from './ProfileLink';

const ListOfLinks = ({ links, removeLink }) => {
  const [listOfLinks, setListOfLinks] = useState(links);

  useEffect(() => {
    setListOfLinks(links);
  }, [links]);

  return listOfLinks.map((link) => (
    <ProfileLink
      linkId={link.id}
      display={link.display}
      link={link.text}
      removeLink={removeLink}
    />
  ));
};

export default ListOfLinks;
