import i18next from "i18next";
import { Panel } from "@/app/components";

type TabCharacterClassProps = {
  title: string,
}

export function PanelCharacterClass({ title }: TabCharacterClassProps) {
  const i18nName = i18next.t(title);

  return (
    <Panel tabButtonId="characterClass">
      {i18nName}
    </Panel>
  );
};
