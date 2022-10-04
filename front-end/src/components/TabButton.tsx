import i18next from 'i18next';
import '@/style/TabButton.css';
import { TabKind } from '@/types';

type TabButtonProps = {
  tabKind: TabKind,
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
  isSelected: boolean,
  selectedClassName: string,
}

export default function TabButton({ tabKind, isSelected, handleClick, selectedClassName }: TabButtonProps) {
  const i18nTabKind = i18next.t(tabKind);
  const i18nClassName = i18next.t(selectedClassName);

  return (
    <button
      type='button' // Prevents default behavior
      role='tab'
      id={tabKind}
      aria-selected={isSelected}
      onClick={handleClick}
      className='tab-button'
    >
      <strong>{ i18nClassName || i18nTabKind }</strong>
    </button>
  );
}
