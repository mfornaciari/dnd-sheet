import i18next from "i18next";
import { Panel } from "@/app/components";

export function PanelSpells() {
  const i18nName = i18next.t("spells");

  return (
    <Panel tabButtonId="spells">
      {i18nName}
    </Panel>
  );
};
