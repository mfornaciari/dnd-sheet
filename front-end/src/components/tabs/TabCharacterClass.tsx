import i18next from "i18next";

type TabCharacterClassProps = {
  selectedClassName: string,
}

export default function TabCharacterClass({ selectedClassName }: TabCharacterClassProps) {
  const i18nName = i18next.t(selectedClassName);

  return (
    <section
      role='tabpanel'
      aria-labelledby='characterClass'
      aria-expanded='true'
      className='tab-panel'
    >
      {i18nName}
    </section>
  );
};
