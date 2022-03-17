import { styled } from '../../stitches.config';

const SubsectionTitle = styled('h2', {
  margin: '2rem 0 0 0',
  '&:first-of-type': {
    marginTop: '1rem',
  },
  '@media (min-width: 800px)': {
    margin: '2rem 0 0 1rem',
  },
});
const SubsectionDesc = styled('h3', {
  margin: '0 0 1rem 0',
  fontFamily: '$body',
  fontWeight: 'normal',
  fontSize: 'small',
  '@media (min-width: 800px)': {
    margin: '0 0 1rem 1rem',
  },
});
const SubsectionGroup = styled('div', {
  borderRadius: '$button',
  backgroundColor: '$gray1',
  padding: '1rem',
  boxShadow: '$low',
});

type Subsection = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

function Subsection({ title, description, children }) {
  if (description.length > 1) {
    return (
      <>
        <SubsectionTitle>{title}</SubsectionTitle>
        <SubsectionDesc>{description}</SubsectionDesc>
        <SubsectionGroup>{children}</SubsectionGroup>
      </>
    );
  } else {
    return (
      <>
        <SubsectionTitle>{title}</SubsectionTitle>
        <SubsectionGroup>{children}</SubsectionGroup>
      </>
    );
  }
}

export default Subsection;
