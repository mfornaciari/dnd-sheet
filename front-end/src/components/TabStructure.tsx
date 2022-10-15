import { useState } from "react";
import { TabKind, Tabs } from "@/types";
import { TabButton } from "@/components/TabButton";
import { TabPersonal } from "@/components/tabs/TabPersonal";
import { TabAttributes } from "@/components/tabs/TabAttributes";
import { TabCharacterClass } from "@/components/tabs/TabCharacterClass";
import { TabSpells } from "@/components/tabs/TabSpells";
import { TabItems } from "@/components/tabs/TabItems";

const tabKinds: TabKind[] = ["personal", "attributes", "characterClass", "spells", "items"];

type TabStructureProps = {
  classTabTitle: string,
}

export function TabStructure({ classTabTitle }: TabStructureProps) {
  const [activeTab, setActiveTab] = useState<TabKind>(() => "personal");

  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass title={classTabTitle} />,
    spells: <TabSpells />,
    items: <TabItems />,
  };

  const tabButtons = tabKinds.map(tabKind => {
    const title = tabKind === "characterClass" ? classTabTitle : tabKind;

    return (
      <TabButton
        key={tabKind}
        tabKind={tabKind}
        handleClick={() => setActiveTab(tabKind)}
        isSelected={activeTab === tabKind}
        title={title}
      />
    );
  });

  return (
    <>
      {tabPanels[activeTab]}

      <ul role="tablist" aria-label="Abas" className="tab-list">
        {tabButtons}
      </ul>
    </>
  );
}
