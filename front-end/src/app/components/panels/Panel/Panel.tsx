import type { TabKind } from "@/types";
import type { PropsWithChildren } from "react";
import "./Panel.css";

type TabPanelProps = {
  tabButtonId: TabKind;
  className?: string;
};

export function Panel({ tabButtonId, className, children }: PropsWithChildren<TabPanelProps>): JSX.Element {
  return (
    <section className={className} id="tab-panel" role="tabpanel" aria-labelledby={tabButtonId} aria-expanded="true">
      {children}
    </section>
  );
}
