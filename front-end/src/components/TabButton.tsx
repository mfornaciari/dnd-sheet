import type { TabNameType } from '@/types';
import i18next from 'i18next';

type TabButtonProps = {
  tabName: TabNameType,
  isSelected: boolean,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default function TabButton({ tabName, isSelected, handleTabClick }: TabButtonProps) {
  const i18nTabName = i18next.t(tabName);

  return (
    <button
      role='tab'
      id={i18nTabName}
      name={tabName}
      aria-selected={isSelected}
      onClick={handleTabClick}
      className='tab-button'
    >
      <strong>{i18nTabName}</strong>
    </button>
  );
}
