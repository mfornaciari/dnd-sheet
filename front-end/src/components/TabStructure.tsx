import { useState } from "react";
import { CharacterClass, TabKind } from "@/types";
import { findClassName } from "@/helpers/formHelpers";
import { TabPanel } from "./TabPanel";
import { TabButton } from "./TabButton";

type TabStructureProps = {
  characterClasses: CharacterClass[],
  selectedClassId: string,
}

export function TabStructure({ characterClasses, selectedClassId }: TabStructureProps) {
  const [activeTab, setActiveTab] = useState<TabKind>(() => 'personal');

  const tabKinds: TabKind[] = ['personal', 'attributes', 'characterClass', 'spells', 'items'];
  const classTabTitle = findClassName(characterClasses, selectedClassId);

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
      <TabPanel activeTab={activeTab} classTabTitle={classTabTitle} />

      <ul role='tablist' aria-label='Abas' className='tab-list'>
        {tabButtons}
      </ul>
    </>
  );
}
