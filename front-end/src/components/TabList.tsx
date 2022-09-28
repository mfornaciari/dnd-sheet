import type { TabNameType } from '@/types';
import TabButton from '@/components/TabButton';

type TabListProps = {
  tabNames: string[],
  activeTab: TabNameType,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TabList({ tabNames, activeTab, handleTabClick }: TabListProps) {
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