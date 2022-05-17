import { styled } from '../../stitches.config';

const TabGroup = styled('div', {
  display: 'flex',
});
const Tab = styled('button', {
  border: 'none',
  fontSize: '$base',
  fontFamily: '$body',
  textAlign: 'center',
  minWidth: '6rem',
  textTransform: 'capitalize',
  backgroundColor: '$gray4',
  borderRadius: '$image $image 0 0',
  padding: '1rem',
  variants: {
    active: {
      true: {
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
