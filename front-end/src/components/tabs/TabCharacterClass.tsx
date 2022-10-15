import i18next from "i18next";

type TabCharacterClassProps = {
  title: string,
}

export default function TabCharacterClass({ title }: TabCharacterClassProps) {
  const i18nName = i18next.t(title);

  return (
    <>{i18nName}</>
  );
};
