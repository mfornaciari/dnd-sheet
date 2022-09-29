import i18next from "i18next";

type TabCharacterClassProps = {
  selectedClassName: string,
}

export default function TabCharacterClass({ selectedClassName }: TabCharacterClassProps) {
  const i18nName = i18next.t(selectedClassName);

  return (
    <>{i18nName}</>
  );
};
