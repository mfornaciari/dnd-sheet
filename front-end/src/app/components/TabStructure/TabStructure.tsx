import type { CharacterClassName, FetchedData, TabKind, Tabs } from "@/types";
import "./TabStructure.css";
import { useState } from "react";
import {
  PanelPersonal,
  PanelAttributes,
  PanelCharacterClass,
  PanelSpells,
  PanelItems,
  TabButton,
} from "@/app/components";

const tabKinds: TabKind[] = ["personal", "attributes", "characterClass", "spells", "items"];

type TabStructureProps = {
  data: FetchedData;
  selectedClassName: CharacterClassName | "characterClass";
}

export function TabStructure({ data, selectedClassName }: TabStructureProps) {
  const [activeTab, setActiveTab] = useState<TabKind>(() => "personal");

  const tabPanels: Tabs = {
    personal: <PanelPersonal />,
    attributes: <PanelAttributes />,
    characterClass: <PanelCharacterClass title={selectedClassName} />,
    spells: <PanelSpells spells={data.spells} />,
    items: <PanelItems />,
  };

  const tabButtons = tabKinds.map(tabKind => {
    const title = tabKind === "characterClass" ? selectedClassName : tabKind;

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
