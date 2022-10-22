import i18next from "i18next";
import { Panel } from "@/app/components";

export function PanelItems() {
  const i18nName = i18next.t("items");

  return (
    <Panel tabButtonId="items">
      {i18nName}
    </Panel>
  );
};
