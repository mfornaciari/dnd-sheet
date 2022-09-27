import type { TabNameType } from '@/types';
import TabButton from '@/components/TabButton';

type TabListProps = {
  activeTab: TabNameType,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TabList({ activeTab, handleTabClick }: TabListProps) {
  const tabNames: TabNameType[] = [
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
            isSelected={activeTab === tabName}
          />
      )}
    </ul>
  );
}