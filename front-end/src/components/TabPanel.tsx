import { TabKind, Tabs } from "@/types";
import TabAttributes from "./tabs/TabAttributes";
import TabCharacterClass from "./tabs/TabCharacterClass";
import TabItems from "./tabs/TabItems";
import TabPersonal from "./tabs/TabPersonal";
import TabSpells from "./tabs/TabSpells";

type TabPanelProps = {
  activeTab: TabKind,
  classTabTitle: string,
}

export function TabPanel({ activeTab, classTabTitle }: TabPanelProps) {
  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass title={classTabTitle} />,
    spells: <TabSpells />,
    items: <TabItems />,
  };

  return (
    <section id='tab-panel' role='tabpanel' aria-labelledby={activeTab} aria-expanded='true'>
      {tabPanels[activeTab]}
    </section>
  )
}
