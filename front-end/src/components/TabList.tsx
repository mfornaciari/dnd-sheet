import type { TabKindType } from '@/types';
import TabButton from '@/components/TabButton';

type TabListProps = {
  tabKinds: TabKindType[],
  activeTab: TabKindType,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
  selectedClassName: string,
}

export default function TabList({ tabKinds, selectedClassName, activeTab, handleTabClick }: TabListProps) {
  function isClassTab(tabKind: TabKindType): boolean {
    return tabKind === 'characterClass';
  }

  return (
    <ul role='tablist' aria-label='Abas' className='tab-list'>
      {tabKinds.map(tabKind =>
        <TabButton
          key={tabKind}
          tabKind={tabKind}
          handleTabClick={handleTabClick}
          isSelected={activeTab === tabKind}
          selectedClassName={isClassTab(tabKind) ? selectedClassName : ''}
        />
      )}
    </ul>
  );
}