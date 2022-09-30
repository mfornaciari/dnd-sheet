import i18next from 'i18next';
import '@/style/TabButton.css';
import { TabKindType } from '@/types';

type TabButtonProps = {
  tabKind: TabKindType,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
  isSelected: boolean,
  selectedClassName: string,
}

export default function TabButton({ tabKind, isSelected, handleTabClick, selectedClassName }: TabButtonProps) {
  const i18nTabKind = i18next.t(tabKind);
  const i18nClassName = i18next.t(selectedClassName);

  return (
    <button
      role='tab'
      id={tabKind}
      aria-selected={isSelected}
      onClick={handleTabClick}
      className='tab-button'
    >
      <strong>{ i18nClassName || i18nTabKind }</strong>
    </button>
  );
}
