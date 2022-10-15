import { PropsWithChildren } from "react";
import { TabKind } from "@/types";

type TabPanelProps = {
  tabButtonName: TabKind,
}

export function TabPanel({ tabButtonName, children }: PropsWithChildren<TabPanelProps>) {
  return (
    <section
      id="tab-panel"
      role="tabpanel"
      aria-labelledby={tabButtonName}
      aria-expanded="true"
    >
      {children}
    </section>
  )
}
