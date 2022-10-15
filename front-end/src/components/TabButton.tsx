import i18next from 'i18next';
import '@/style/TabButton.css';
import { CharacterClassName, TabKind } from '@/types';

type TabButtonProps = {
  tabKind: TabKind,
  handleClick: React.MouseEventHandler<HTMLButtonElement>,
  isSelected: boolean,
  title: CharacterClassName | TabKind,
}

export function TabButton({ tabKind, isSelected, handleClick, title }: TabButtonProps) {
  const i18nTitle = i18next.t(title);

  return (
    <button
      type='button' // Prevents default behavior
      role='tab'
      id={tabKind}
      aria-selected={isSelected}
      onClick={handleClick}
      className='tab-button'
    >
      <strong>{i18nTitle}</strong>
    </button>
  );
}
