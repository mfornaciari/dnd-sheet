import i18next from "i18next";
import { TabPanel } from "@/components/tabs/TabPanel";

export function TabItems() {
  const i18nName = i18next.t("items");

  return (
    <TabPanel tabButtonName="items">
      {i18nName}
    </TabPanel>
  );
};
