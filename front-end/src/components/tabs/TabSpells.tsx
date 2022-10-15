import i18next from "i18next";
import { TabPanel } from "@/components/tabs/TabPanel";

export function TabSpells() {
  const i18nName = i18next.t("spells");

  return (
    <TabPanel tabButtonName="spells">
      {i18nName}
    </TabPanel>
  );
};
