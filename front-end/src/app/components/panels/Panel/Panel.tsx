import { PropsWithChildren } from "react";
import { TabKind } from "@/types";

type TabPanelProps = {
  tabButtonId: TabKind,
}

export function Panel({ tabButtonId, children }: PropsWithChildren<TabPanelProps>) {
  return (
    <section
      id="tab-panel"
      role="tabpanel"
      aria-labelledby={tabButtonId}
      aria-expanded="true"
    >
      {children}
    </section>
  )
}
