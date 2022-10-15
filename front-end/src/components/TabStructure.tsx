import { useState } from "react";
import { CharacterClass, TabKind, Tabs } from "@/types";
import { findClassName } from "@/helpers/formHelpers";
import { TabButton } from "./TabButton";
import TabPersonal from "./tabs/TabPersonal";
import TabAttributes from "./tabs/TabAttributes";
import TabCharacterClass from "./tabs/TabCharacterClass";
import TabSpells from "./tabs/TabSpells";
import TabItems from "./tabs/TabItems";

type TabStructureProps = {
  characterClasses: CharacterClass[],
  selectedClassId: string,
}

export function TabStructure({ characterClasses, selectedClassId }: TabStructureProps) {
  const [activeTab, setActiveTab] = useState<TabKind>(() => 'personal');

  const tabKinds: TabKind[] = ['personal', 'attributes', 'characterClass', 'spells', 'items'];
  const classTabTitle = findClassName(characterClasses, selectedClassId);

  const tabPanels: Tabs = {
    personal: <TabPersonal />,
    attributes: <TabAttributes />,
    characterClass: <TabCharacterClass title={classTabTitle} />,
    spells: <TabSpells />,
    items: <TabItems />,
  };
  const tabButtons = tabKinds.map(tabKind => {
    const title = tabKind === 'characterClass' ? classTabTitle : tabKind;

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
      <section id='tab-panel' role='tabpanel' aria-labelledby={activeTab} aria-expanded='true'>
        {tabPanels[activeTab]}
      </section>

      <ul role='tablist' aria-label='Abas' className='tab-list'>
        {tabButtons}
      </ul>
    </>
  );
}
