import i18next from "i18next";
import { TabPanel } from "@/components/tabs/TabPanel";

type TabCharacterClassProps = {
  title: string,
}

export function TabCharacterClass({ title }: TabCharacterClassProps) {
  const i18nName = i18next.t(title);

  return (
    <TabPanel tabButtonId="characterClass">
      {i18nName}
    </TabPanel>
  );
};
