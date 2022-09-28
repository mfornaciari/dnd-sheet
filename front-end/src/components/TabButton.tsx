import { TabKindType } from '@/types';
import i18next from 'i18next';

type TabButtonProps = {
  tabKind: TabKindType,
  isSelected: boolean,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
  selectedClassName: string,
}

export default function TabButton({ tabKind, isSelected, handleTabClick, selectedClassName }: TabButtonProps) {
  const i18nTabKind = i18next.t(tabKind);
  const i18nTabName = i18next.t(selectedClassName);

  return (
    <button
      role='tab'
      id={tabKind}
      // name={tabKind}
      aria-selected={isSelected}
      onClick={handleTabClick}
      className='tab-button'
    >
      <strong>{i18nTabName || i18nTabKind }</strong>
    </button>
  );
}
