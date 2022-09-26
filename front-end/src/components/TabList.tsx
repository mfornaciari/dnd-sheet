import TabButton from '@/components/TabButton';

type TabListProps = {
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TabList({ handleTabClick }: TabListProps) {
  const tabNames = [
    'personal',
    'attributes',
    'characterClass',
    'spells',
    'items',
  ];

  return (
    <ul role='tablist' aria-label='Abas' className='tab-list'>
      {tabNames.map(tabName =>
          <TabButton
            key={tabName}
            tabName={tabName}
            handleTabClick={handleTabClick}
          />
      )}
    </ul>
  );
}