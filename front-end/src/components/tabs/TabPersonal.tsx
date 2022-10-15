import i18next from "i18next";
import { TabPanel } from "@/components/tabs/TabPanel";

export function TabPersonal() {
  const i18nName = i18next.t("personal");

  return (
    <TabPanel tabButtonName="personal">
      {i18nName}
    </TabPanel>
  );
}
