import type { LevelSpellNames, SectionObject, Spell } from "@/types";
import "./PanelSpells.css";
import { useSpells } from "@/app/hooks";
import { ListWithSections, Panel } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const {
    addSelectedSpell,
    allSpellNamesByLevel,
    handleSpellsListItemClick,
    knownSpellNamesByLevel,
    removeSelectedSpell,
    selectedSpell,
    selectedSpellIsKnown,
  } = useSpells(spells);

  function buildSpellSectionObjects(spellNamesByLevel: LevelSpellNames[]): SectionObject[] {
    return spellNamesByLevel.map(levelObject => ({
      title: `Nível ${levelObject.level}`,
      elements: levelObject.spellNames.map(spellName => buildSpellListButton(spellName)),
    }));
  }

  function buildSpellListButton(spellName: string): JSX.Element {
    const snakecasedSpellName = spellName.toLowerCase().replace(/ /g, "_");

    return (
      <button type="button" key={snakecasedSpellName} onClick={handleSpellsListItemClick}>
        {spellName}
      </button>
    );
  }

  const allSpellsSectionObjects = buildSpellSectionObjects(allSpellNamesByLevel);
  const knownSpellsSectionObjects = buildSpellSectionObjects(knownSpellNamesByLevel);
  const spellCardButton = selectedSpellIsKnown
    ? buildSpellCardButton("Remover das conhecidas", removeSelectedSpell)
    : buildSpellCardButton("Adicionar às conhecidas", addSelectedSpell);

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections title="Magias disponíveis" sectionObjects={allSpellsSectionObjects} />

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

      <ListWithSections title="Magias conhecidas" sectionObjects={knownSpellsSectionObjects} />
    </Panel>
  );
}

// PRIVATE

function parseArray(array: string[]): string {
  const joinedString = array.join(", ");
  const firstLetter = joinedString.charAt(0);
  return firstLetter.toUpperCase() + joinedString.slice(1);
}

function buildSpellCardButton(text: string, handler: () => void): JSX.Element {
  return (
    <button type="button" onClick={handler}>
      {text}
    </button>
  );
}
