import i18next from 'i18next';

type TabButtonProps = {
  tabName: string,
  handleTabClick: React.MouseEventHandler<HTMLButtonElement>,
}

export default ({ tabName, handleTabClick }: TabButtonProps) => {
  const i18nTabName = i18next.t(tabName);

  return (
    <button
      role='tab'
      id={tabName}
      className='tab-button'
      onClick={handleTabClick}
    >
      {i18nTabName}
    </button>
  );
}
