import i18next from "i18next";
import { Panel } from "@/app/components";

export function PanelAttributes() {
  const i18nName = i18next.t("attributes");

  return (
    <Panel tabButtonId="attributes">
      {i18nName}
    </Panel>
  );
};
