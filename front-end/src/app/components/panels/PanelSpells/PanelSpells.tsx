import type { Spell } from "@/types";
import "./PanelSpells.css";
import { useSpells } from "@/app/hooks";
import { ListItemClickable, ListWithSections, Panel } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const {
    addSelectedSpell,
    allSpellNamesByLevel,
    allSpellsSectionNames,
    handleSpellsListItemClick,
    knownSpellNamesByLevel,
    knownSpellsSectionNames,
    removeSelectedSpell,
    selectedSpell,
    selectedSpellIsKnown,
  } = useSpells(spells);

  function buildSpellListItemsByLevel(spellNamesByLevel: string[][]): JSX.Element[][] {
    return spellNamesByLevel.map(group =>
      group.map(spellName => (
        <ListItemClickable key={spellName} onClick={handleSpellsListItemClick}>
          {spellName}
        </ListItemClickable>
      ))
    );
  }
  function buildSpellCardButton(text: string, handler: () => void): JSX.Element {
    return (
      <button type="button" onClick={handler}>
        {text}
      </button>
    );
  }

  const allSpellsListItemsByLevel = buildSpellListItemsByLevel(allSpellNamesByLevel);
  const knownSpellsListItemsByLevel = buildSpellListItemsByLevel(knownSpellNamesByLevel);
  const spellCardButton = selectedSpellIsKnown
    ? buildSpellCardButton("Remover das conhecidas", removeSelectedSpell)
    : buildSpellCardButton("Adicionar às conhecidas", addSelectedSpell);

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections
        title="Magias disponíveis"
        sectionNames={allSpellsSectionNames}
        listItemsBySection={allSpellsListItemsByLevel}
      />

      <section aria-labelledby="spell-card-heading" className="spell-card">
        <h1 id="spell-card-heading">{selectedSpell.name}</h1>

        {spellCardButton}

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

function parseArray(array: string[]): string {
  const joinedString = array.join(", ");
  const firstLetter = joinedString.charAt(0);
  return firstLetter.toUpperCase() + joinedString.slice(1);
}
