import type { MouseEvent } from "react";
import type { Spell } from "@/types";
import "./PanelSpells.css";
import { useSpells } from "@/app/hooks";
import { ListItemClickable, ListWithSections, Panel } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const {
    allSpellNamesByLevel,
    allSpellsSectionNames,
    handleAllSpellsListItemClick,
    handleKnownSpellsListItemClick,
    knownSpellNamesByLevel,
    knownSpellsSectionNames,
    selectedSpell,
  } = useSpells(spells);

  const allSpellsListItemsByLevel = buildSpellListItemsByLevel(allSpellNamesByLevel, handleAllSpellsListItemClick);
  const knownSpellsListItemsByLevel = buildSpellListItemsByLevel(
    knownSpellNamesByLevel,
    handleKnownSpellsListItemClick
  );

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections
        title="Magias disponíveis"
        sectionNames={allSpellsSectionNames}
        listItemsBySection={allSpellsListItemsByLevel}
      />

      <section aria-labelledby="spell-card-heading" className="spell-card">
        <h1 id="spell-card-heading">{selectedSpell.name}</h1>

        <dl className="spell-card-data">
          <div role="presentation" id="spell-card-school" className="spell-card-inline-entry">
            <dt className="spell-card-term">Escola:</dt>
            <dd className="spell-card-definition">{selectedSpell.school}</dd>
          </div>

          <div role="presentation" id="spell-card-level" className="spell-card-inline-entry">
            <dt className="spell-card-term">Nível:</dt>
            <dd className="spell-card-definition">{selectedSpell.level}</dd>
          </div>

          <div role="presentation" id="spell-card-classes" className="spell-card-inline-entry">
            <dt className="spell-card-term">Classes:</dt>
            <dd className="spell-card-definition">
              {parseArray(selectedSpell.characterClasses.map(characterClass => characterClass.name))}
            </dd>
          </div>

          <div role="presentation" id="spell-card-casting-time" className="spell-card-inline-entry">
            <dt className="spell-card-term">Tempo de conjuração:</dt>
            <dd className="spell-card-definition">{selectedSpell.castingTime}</dd>
          </div>

          <div role="presentation" id="spell-card-range" className="spell-card-inline-entry">
            <dt className="spell-card-term">Alcance:</dt>
            <dd className="spell-card-definition">{selectedSpell.range}</dd>
          </div>

          <div role="presentation" id="spell-card-duration" className="spell-card-inline-entry">
            <dt className="spell-card-term">Duração:</dt>
            <dd className="spell-card-definition">{selectedSpell.duration}</dd>
          </div>

          <div role="presentation" id="spell-card-components" className="spell-card-inline-entry">
            <dt className="spell-card-term">Componentes:</dt>
            <dd className="spell-card-definition">{parseArray(selectedSpell.components)}</dd>
          </div>

          <div role="presentation" id="spell-card-material-components">
            <dt className="spell-card-term">Componentes materiais:</dt>
            <dd className="spell-card-definition">{selectedSpell.materialComponents}</dd>
          </div>

          <div role="presentation" id="spell-card-description">
            <dt className="spell-card-term">Descrição:</dt>
            <dd className="spell-card-definition">{selectedSpell.description}</dd>
          </div>

          <div role="presentation" id="spell-card-at-higher-levels">
            <dt className="spell-card-term">Em níveis superiores:</dt>
            <dd className="spell-card-definition">{selectedSpell.atHigherLevels}</dd>
          </div>

          <div role="presentation" id="spell-card-ritual">
            <dt className="spell-card-term">Ritual:</dt>
            <dd className="spell-card-definition">{selectedSpell.ritual ? "Sim" : "Não"}</dd>
          </div>
        </dl>
      </section>

      <ListWithSections
        title="Magias conhecidas"
        sectionNames={knownSpellsSectionNames}
        listItemsBySection={knownSpellsListItemsByLevel}
      />
    </Panel>
  );
}

// PRIVATE

function buildSpellListItemsByLevel(
  spellNamesByLevel: string[][],
  handleClick: (event: MouseEvent<HTMLLIElement>) => void
): JSX.Element[][] {
  const spellListItemsByLevel = spellNamesByLevel.map(group =>
    group.map(spellName => (
      <ListItemClickable key={spellName} onClick={handleClick}>
        {spellName}
      </ListItemClickable>
    ))
  );
  return spellListItemsByLevel;
}

function parseArray(array: string[]): string {
  const joinedString = array.join(", ");
  const firstLetter = joinedString.charAt(0);
  return firstLetter.toUpperCase() + joinedString.slice(1);
}
