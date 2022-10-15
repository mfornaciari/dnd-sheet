import i18next from "i18next";
import { TabPanel } from "@/components/tabs/TabPanel";

export function TabAttributes() {
  const i18nName = i18next.t("attributes");

  return (
    <TabPanel tabButtonId="attributes">
      {i18nName}
    </TabPanel>
  );
};
