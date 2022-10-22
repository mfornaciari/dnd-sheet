import i18next from "i18next";
import { Panel } from "@/app/components";

export function PanelPersonal() {
  const i18nName = i18next.t("personal");

  return (
    <Panel tabButtonId="personal">
      {i18nName}
    </Panel>
  );
}
