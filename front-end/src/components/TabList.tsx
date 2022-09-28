import type { TabNameType } from '@/types';
import TabButton from '@/components/TabButton';

type TabListProps = {
  activeTab: TabNameType,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
  selectedClassName: TabNameType,
}

export default function TabList({ activeTab, handleTabClick, selectedClassName }: TabListProps) {
  const tabNames: TabNameType[] = [
    'personal',
    'attributes',
    selectedClassName,
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