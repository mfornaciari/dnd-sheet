import type { TabKind } from "@/types";
import type { PropsWithChildren } from "react";
import "./Panel.css";

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
