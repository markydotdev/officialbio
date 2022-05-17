import { styled } from '../../stitches.config';

const TabGroup = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  margin: '0.5rem',
});
const Tab = styled('button', {
  fontSize: '$base',
  fontWeight: 'bold',
  fontFamily: '$body',
  textAlign: 'center',
  minWidth: '6rem',
  textTransform: 'capitalize',
  padding: '1rem',
  margin: '0.1rem',
  border: '2px solid transparent',
  borderRadius: '99px',
  transition: '$main',
  '&:hover': {
    backgroundColor: '$gray1',
    transform: 'scale(1.01)',
  },
  '&:active': {
    transform: 'scale(0.9)',
  },
  variants: {
    active: {
      true: {
        border: '2px solid $gray12',
        backgroundColor: '$gray1',
      },
    },
  },
});

const TYPE_OF_TABS = ['text', 'link', 'profile'];

const Tabs = ({ activeTab, setActiveTab }) => {
  const handleTabChange = (type) => {
    setActiveTab(type);
    localStorage.setItem('active-tab', type);
  };

  return (
    <>
      <TabGroup>
        {TYPE_OF_TABS.map((type) => (
          <Tab
            type='button'
            key={type}
            active={activeTab === type}
            onClick={() => handleTabChange(type)}
          >
            {type}
          </Tab>
        ))}
      </TabGroup>
    </>
  );
};

export default Tabs;
